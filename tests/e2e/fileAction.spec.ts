import { test, expect, type Page } from '@playwright/test'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

/**
 * The directory holding the built bundles. Defaults to the app's own `js/`
 * after a local build; CI points it at the extracted release archive.
 */
const jsDir = process.env.FILES_ARCHIVE_JS_DIR ?? resolve(import.meta.dirname, '../../js')
const appPrefix = '/apps/files_archive/js/'

/** File name of the built bundle for a Vite entry point. */
function bundleFor(entry: string): string {
  const prefix = `files_archive-${entry}-`
  const name = readdirSync(jsDir).find((file) => file.startsWith(prefix) && file.endsWith('.mjs'))
  if (!name) {
    throw new Error(`No built bundle for entry "${entry}" in ${jsDir} - run the build first`)
  }
  return name
}

/**
 * Load a built entry point in a real browser with a minimal stand-in for the
 * Nextcloud runtime. The built JS and its chunks are served from disk, so the
 * test exercises the exact bundle the app ships rather than the sources.
 */
async function loadEntry(page: Page, entry: string): Promise<void> {
  const name = bundleFor(entry)
  await page.addInitScript(() => {
    const w = window as unknown as Record<string, unknown>
    w.OC = { PERMISSION_READ: 1, requestToken: 'test', config: { versionstring: '35.0.0' } }
    w.OCP = { Files: { Router: { goToRoute: () => {} } } }
    w.t = (_app: string, text: string) => text
    w.n = (_app: string, singular: string, plural: string, count: number) => (count === 1 ? singular : plural)
    w._nc_initial_state = new Map([
      ['#initial-state-files_archive-config', {
        adminContact: '',
        archiveMimeTypes: ['application/zip', 'application/x-tar'],
        mountStripCommonPathPrefixDefault: false,
        extractStripCommonPathPrefixDefault: false,
        mountBackgroundJob: false,
        extractBackgroundJob: false,
        mountByLeftClick: false,
        mountDisabled: false,
      }],
    ])
  })
  await page.route('**/*', (route) => {
    const path = new URL(route.request().url()).pathname
    if (path.startsWith(appPrefix) && path.endsWith('.mjs')) {
      const file = join(jsDir, path.slice(appPrefix.length))
      if (existsSync(file)) {
        return route.fulfill({ contentType: 'application/javascript', body: readFileSync(file, 'utf8') })
      }
    }
    return route.fulfill({
      contentType: 'text/html',
      body: '<!doctype html><html><head></head><body></body></html>',
    })
  })
  await page.goto('/apps/files_archive/')
  await page.addScriptTag({ url: appPrefix + name, type: 'module' })
}

/** Ids of the file actions the loaded bundle registered. */
function registeredActions(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const scope = (window as unknown as {
      _nc_files_scope?: { v4_0?: { fileActions?: Map<string, unknown> } }
    })._nc_files_scope
    return Array.from(scope?.v4_0?.fileActions?.keys() ?? [])
  })
}

/**
 * Evaluate the `enabled` predicate of a registered action for the given files.
 * `permissions` defaults to read access.
 */
function actionEnabled(
  page: Page,
  id: string,
  files: Array<{ mime: string, permissions?: number }>,
): Promise<boolean | null> {
  return page.evaluate(({ id, files }) => {
    const scope = (window as unknown as {
      _nc_files_scope?: { v4_0?: { fileActions?: Map<string, { enabled?: (context: unknown) => boolean }> } }
    })._nc_files_scope
    const action = scope?.v4_0?.fileActions?.get(id)
    if (!action?.enabled) {
      return null
    }
    const nodes = files.map((file) => ({
      type: 'file',
      mime: file.mime,
      permissions: file.permissions ?? 1,
      basename: 'archive',
    }))
    return action.enabled({ nodes })
  }, { id, files })
}

test('registers the mount and extract file actions', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))

  await loadEntry(page, 'files-hooks')

  expect(await registeredActions(page)).toEqual(
    expect.arrayContaining(['files_archive', 'files_archive-extract']),
  )
  expect(errors).toEqual([])
})

test('the actions follow the configured archive mime types', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))

  await loadEntry(page, 'files-hooks')

  // Both actions share the same enabled() logic. The mime types come from the
  // app's initial state (see loadEntry), so this fails if the bundle does not
  // read its configured state.
  for (const id of ['files_archive', 'files_archive-extract']) {
    expect(await actionEnabled(page, id, [{ mime: 'application/zip' }])).toBe(true)
    expect(await actionEnabled(page, id, [{ mime: 'application/x-tar' }])).toBe(true)
    expect(await actionEnabled(page, id, [{ mime: 'application/pdf' }])).toBe(false)
    // Read permission is required.
    expect(await actionEnabled(page, id, [{ mime: 'application/zip', permissions: 0 }])).toBe(false)
  }
  expect(errors).toEqual([])
})
