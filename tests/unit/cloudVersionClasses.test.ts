import { beforeEach, describe, expect, it, vi } from 'vitest'

/**
 * The cloud version classes are appended to the app's root element so the
 * stylesheets can target a specific Nextcloud version. They are derived from
 * the server version at module load, so the import is re-run per test.
 */
describe('cloudVersionClasses', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.stubGlobal('OC', { config: { versionstring: '35.0.1' } })
  })

  it('derives the version classes from the server version', async () => {
    const { default: classes, cloudVersion } = await import('../../src/toolkit/util/cloud-version-classes.ts')

    expect(cloudVersion).toEqual([35, 0, 1])
    expect(classes).toEqual([
      'cloud-version',
      'cloud-version-major-35',
      'cloud-version-minor-0',
      'cloud-version-patch-1',
    ])
  })
})
