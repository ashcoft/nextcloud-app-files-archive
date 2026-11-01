// SPDX-License-Identifier: AGPL-3.0-or-later
//
// Set the app version in appinfo/info.xml and package.json. Called by
// `make bump-version` (which semantic-release uses to bump the version).
// Usage: node scripts/bump-version.mjs <version>

import { readFileSync, writeFileSync } from 'node:fs'

const version = process.argv[2]

if (!version) {
  console.error('usage: node scripts/bump-version.mjs <version>')
  process.exit(1)
}
// Semantic version, optionally with a pre-release and/or build suffix.
if (!/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$/.test(version)) {
  console.error(`ERROR: not a valid semantic version: ${version}`)
  process.exit(1)
}

const infoPath = 'appinfo/info.xml'
const info = readFileSync(infoPath, 'utf8')
if (!/<version>[^<]*<\/version>/.test(info)) {
  console.error(`ERROR: no <version> element in ${infoPath}`)
  process.exit(1)
}
writeFileSync(infoPath, info.replace(/<version>[^<]*<\/version>/, `<version>${version}</version>`))

const pkgPath = 'package.json'
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
pkg.version = version
writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)

console.log(`Version bumped to ${version}`)
