## [1.3.3](https://github.com/ashcoft/nextcloud-app-files-archive/compare/v1.3.2...v1.3.3) (2026-11-01)


### Bug Fixes

* **l10n:** Update translations from Transifex ([fb96cd9](https://github.com/ashcoft/nextcloud-app-files-archive/commit/fb96cd9a9e5403256e16ff9372128161da147b72))

## [1.3.2](https://github.com/ashcoft/nextcloud-app-files-archive/compare/v1.3.1...v1.3.2) (2026-11-01)


### Bug Fixes

* **build:** migrate remaining TypeScript transformer references ([d2c81a1](https://github.com/ashcoft/nextcloud-app-files-archive/commit/d2c81a1c151ace6af7e9306bdcf9db5c25543c82))
* **dev-scripts:** fix autoloading. ([bbccb96](https://github.com/ashcoft/nextcloud-app-files-archive/commit/bbccb96a7861f8a5e3ccc92a03f69849aea649bb))
* **l10n:** Update translations from Transifex ([62abda1](https://github.com/ashcoft/nextcloud-app-files-archive/commit/62abda1d1486249a262de7ee8040fb9237a92ccb))
* **l10n:** Update translations from Transifex ([2cc54cb](https://github.com/ashcoft/nextcloud-app-files-archive/commit/2cc54cbc7c5677541ac9f7ded437c47e82f110ab))
* **l10n:** Update translations from Transifex ([07961b5](https://github.com/ashcoft/nextcloud-app-files-archive/commit/07961b57e2c86af5e0eb4a1f98ee66752b03212b))
* **l10n:** Update translations from Transifex ([adb5dc7](https://github.com/ashcoft/nextcloud-app-files-archive/commit/adb5dc792a8a2cf6980ae11022c4c444244ac28f))
* **l10n:** Update translations from Transifex ([319e9f9](https://github.com/ashcoft/nextcloud-app-files-archive/commit/319e9f932df2fa431c07f6c5ac79fc14a84fafb6))
* **l10n:** Update translations from Transifex ([28d3929](https://github.com/ashcoft/nextcloud-app-files-archive/commit/28d39292511ad042debab336063618da591cb778))
* **l10n:** Update translations from Transifex ([4359fd5](https://github.com/ashcoft/nextcloud-app-files-archive/commit/4359fd524e03cff765b2f7b4ae01f0e4c2ebf129))
* **l10n:** Update translations from Transifex ([845ec87](https://github.com/ashcoft/nextcloud-app-files-archive/commit/845ec87b7603e44427cfc5692d23e7b2eb02155b))
* **l10n:** Update translations from Transifex ([9deb3da](https://github.com/ashcoft/nextcloud-app-files-archive/commit/9deb3da2200c3dbfb7f95d3890e070f1b8177f6a))
* **l10n:** Update translations from Transifex ([de505f6](https://github.com/ashcoft/nextcloud-app-files-archive/commit/de505f646fb1194f706e63aa77eaf6a5b3b4f6f3))
* **l10n:** Update translations from Transifex ([1d546a3](https://github.com/ashcoft/nextcloud-app-files-archive/commit/1d546a34a7b8fbc07668112bb247a45562778711))
* **l10n:** Update translations from Transifex ([e1d378e](https://github.com/ashcoft/nextcloud-app-files-archive/commit/e1d378e7f45f101e718cae2dbc4383e72db43927))
* **l10n:** Update translations from Transifex ([dd91b50](https://github.com/ashcoft/nextcloud-app-files-archive/commit/dd91b5078dd09c23f82ab44dbc607da391c5b210))
* **l10n:** Update translations from Transifex ([c396286](https://github.com/ashcoft/nextcloud-app-files-archive/commit/c3962863b5ddeb8c1a5d49008d32942679ded583))
* **l10n:** Update translations from Transifex ([3d47aa5](https://github.com/ashcoft/nextcloud-app-files-archive/commit/3d47aa5f1ecc7a547eb65bf4aed0bc93fe26608f))
* **l10n:** Update translations from Transifex ([9b899ca](https://github.com/ashcoft/nextcloud-app-files-archive/commit/9b899cabfe391abed2035e964bf2bf58f5a479e1))
* **upgrade:** bootstrap Composer toolkit before app migrations ([3c046cb](https://github.com/ashcoft/nextcloud-app-files-archive/commit/3c046cbe0e7e937e56a4010db746077a69ad5096))
* **upgrade:** survive the in-process update from 1.2.x during a server upgrade ([c33a997](https://github.com/ashcoft/nextcloud-app-files-archive/commit/c33a997b04103826c152c26935329d42e1e71617))

# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.3.1] -- 2026-10-01

### Fixed

- typo in ExceptionMiddleware leading to an exception
- broken migrations making it impossible to freshly install this app

## [1.3.0] -- 2026-09-29

### Changed

- support NC33-NC35 and up
- drop support for NC32 and below
- support PHP 8.4 and up
- drop support for PHP 8.3 and below
- switch to Vue3

### Added

- basic CI checks for PRs (courtesy Fabio Fantoni)
- "extract here" menu item (courtesy Fabio Fantoni)
- tarball generation on tag vX.Y.Z push (courtesy Fabio Fantoni)

### Fixed

- replace legacy storage ids using the archive pathname by consistent
  storage ids using the archive file id
- remove the storage file path name from the database cache
- wrap wapmorgan\UnifiedArchive using php-scoper
- improved filename encoding handling (courtesy Fabio Fantoni)

## [1.2.8] -- 2025-10-15

### Added

- claim to support NC32, drop NC29.

### Fixed

- workaround issues in Nextcloud core which notoriously copies also
  the permissions out of read-only storage to the destination of a
  copy operation. See https://github.com/rotdrop/nextcloud-app-files-archive/issues/55.
- translations courtesy of the Nextcloud language team

## [1.2.7] -- 2025-06-22

### Added

- optionally make mounting the archive the default action when
  clicking on the file, this means:
  - the action will still be visible in the action/context
    menu, but just like clicking on a folder will navigate to that
    folder, clicking on the archive file will now first mount it and
    then navigate to the mount point, i.e. open the mounted directory tree
  - if an archive is already mounted, then clicking on the archive (if
    configured) will still display a notice that this is the case and
    the also will navigate to the mounted archive folder.
  - if asynchronous mounting is the default then a simple click will
    still initiate the mount background job, but that's it in this case.

### Fixed

- WIP: composer dependencies with NC29

- some of the personal settings tried to access admin settings which
  luckily did not work. Fix this and store all values in the personal
  settings of the respective user.

## [1.2.6] -- 2025-04-09

### Fixed

- node busy indicator handling for frontend operations

## [1.2.5] -- 2025-04-08

### Added

- support Nextcloud 29 / 30 / 31

### Removed

- drop support fro Nextcloud 28 and older

### Changed

- convert to Vue Composition API and Typescript

### Remarks

Starting with NC31 the (unfortunately unofficial) interface for
defining storages has changed. Starting from NC v31 the underlying
abstract base class is strongly type-hinted. Before v31 it was
"sloppy". This introduces a code bifurcation in lib/Storage which
hopefully can be abandoned when NC V29 and v30 are obsoleted,
i.e. when Nextcloud v33 is released.

## [1.2.4-rc7] - 2024-05-29

### Fixed

- stripping of common directory prefixes was deeply broken

- fix issue #38 "Unable to copy folders to another folder"

- fix setting the archive-bomb limits in the settinhs pages

- fix non-utf-8 external apps by setting environment variables

- fix mime-type and aliases registration

- work around AlchemyZippy bug in UnifiedArchive

- fix construction of zip-bomp protection exception

- pome quirks, unicode normalization

### Added

- support NC 29

- include symfony console to make vendor/bin/cam (UnifiedArchive command line utility) functional

## [1.2.3] - 2024-03-30

### Fixed

- A spurious error message in the logs. This did not affect the
  functi
  onality of the app but puzzled its users.

## [1.2.2] - 2024-03-23

### Fixed

- restore PHP 8.1 compatibility

- personal settings dialog courtesy of @kemitix

## [1.2.1] - 2024-03-21

### Fixed

- Database migration

- Some trait classes use constants, so we need PHP >= 8.2

## [1.2.0] - 2024-03-17

### Added

- Support Nextcloud v28, in particular use the new event-bus as the
  old legacy file-list is no longer available.

### Changed

- Reduce the size of the JS assets needed to hook in to the files-app sidebar

- Use latest @nextcloud/vue toolkit.

- Drop support for Nextcloud <= v27. The differences in the files-API
  are just too big.

- Translations

### Fixed

- Fix the use of the file-cache in order to avoid excessive re-scans
  of the potentionally large and complicated archive file.

## [1.1.4-rc1] - unreleased

#### Fixed

- update some packages

## [1.1.3] - 2023-08-02

### Fixed

- Update Vue components
- Update archive backend
- translations and spelling
- fix handling of password protected archives

## [1.1.2] - 2023-01-19

### Fixes

- Bump the minimal required PHP version to 8.0 as the app breaks installations still using PHP 7.4.

## [1.1.1] - 2023-01-17

### Fixed

- Theming and styles for Nextcloud v25

## [1.1.0] - 2022-12-11

### Added

- background jobs

### Fixed

- a bunch of orthographical errors with respect to the untranslated (en_US) texts

## [1.0.6] - 2022-11-17

### Added

- internal restructuring of Vue and PHP source code, there is now a
  common base of code shared between the
  [PDF Downloader](https://github.com/rotdrop/nextcloud-app-pdf-downloader)
  and this app.

## Fixed

- fix mime-type injection code

## [1.0.5] - 2022-11-12

### Fixed

- app category is now "files", no longer "office"

## [1.0.4] - 2022-11-12

### Fixed

- Nextcloud is missing some prominent MIME-type mappings. Add them.
- Performance for large archives -- partly. This is still an issue,
  but has been improved
- Correctness of file-listing if underlying archive file has changed.

### Added

- expose the back-end driver name in the side-bar menu to ease debugging

## [1.0.3] - 2022-11-10

### Fixed

- File-cache inconsistency causing mount-points not showing up in UI
- Avoid using NelexaZip as archive-backend for ZIP-archives as it
  causes problems at least with archives generated by the `zipper`
  app.

### Added

- Optionally strip a common path prefix when mounting or extracting
  archives. This is meant for the not unsual case when the archive
  content is wrapped into a top-level directory.
- templates for the mount/extraction folder names via user preferences
- conflict resolution if the target mount point / extraction folder
  already exists

## [1.0.2] - 2022-11-09

### Fixed

- screenshot links in appinfo.xml

## [1.0.1] - 2022-11-09

### Added

- Encryption support

## [1.0.0] - 2022-11-07

### Added

- First un-release
