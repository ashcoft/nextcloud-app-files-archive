// SPDX-License-Identifier: AGPL-3.0-or-later
//
// semantic-release configuration: derive the next version from the commit
// messages on main, bump appinfo/info.xml and package.json, create the tag and
// a draft GitHub release. The release workflow then builds the app archive
// from the tag and publishes the draft, so a release never goes public without
// its assets.
//
// This file is .mjs because package.json sets "type": "module".

/**
 * Release policy:
 *
 *   feat! / BREAKING CHANGE -> major
 *   feat                    -> minor
 *   perf                    -> minor
 *   fix                     -> patch
 *   everything else         -> no release
 *
 * Maintenance commits (chore, docs, test, ci, build, refactor, style) are kept
 * out of releases on purpose: they used to produce a patch release each, which
 * flooded the tags. Bug fixes are released as patches so a fix that lands on
 * its own still reaches users.
 *
 * Note: the analyzer falls back to its built-in patch rules when no custom
 * rule matches, so every type that must not release needs an explicit
 * `release: false` entry.
 */
const releaseRules = [
  { breaking: true, release: 'major' },
  // git-style reverts ("Revert \"feat: ...\"") have no conventional type.
  { revert: true, release: false },
  { type: 'feat', release: 'minor' },
  { type: 'perf', release: 'minor' },
  { type: 'fix', release: 'patch' },
  { type: 'refactor', release: false },
  { type: 'docs', release: false },
  { type: 'style', release: false },
  { type: 'test', release: false },
  { type: 'build', release: false },
  { type: 'ci', release: false },
  { type: 'chore', release: false },
  { type: 'revert', release: false },
];

export default {
  branches: ['main'],
  // Do not rely on the package.json "repository" field: it points at the
  // upstream project, while releases are published from this repository. On
  // GitHub Actions GITHUB_REPOSITORY names the repository being released; leave
  // it unset elsewhere so semantic-release falls back to package.json/origin.
  repositoryUrl: process.env.GITHUB_REPOSITORY
    ? `https://github.com/${process.env.GITHUB_REPOSITORY}.git`
    : undefined,
  plugins: [
    ['@semantic-release/commit-analyzer', { preset: 'conventionalcommits', releaseRules }],
    '@semantic-release/release-notes-generator',
    ['@semantic-release/changelog', { changelogFile: 'CHANGELOG.md' }],
    ['@semantic-release/exec', { prepareCmd: 'node scripts/bump-version.mjs ${nextRelease.version}' }],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'appinfo/info.xml', 'package.json'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/github',
      {
        // The archives are attached by the release workflow, which also
        // publishes the draft once they are there.
        assets: null,
        draftRelease: true,
      },
    ],
  ],
};
