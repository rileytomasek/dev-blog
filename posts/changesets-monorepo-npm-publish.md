---
title: Publish monorepo packages with Changesets
publish_date: 2022-10-01
description: Painlessly publish public/private packages to NPM from a monorepo.
---

[Changesets](https://github.com/changesets/changesets) makes it easy to publish public and/or private packages to NPM from a monorepo.

## Features
- Specify packages in a monorepo to publish
- Update package version numbers
- Append to changelogs
- Create git tags for the release
- Publish to NPM

## Usage Commands
- `changeset add` specifies which packages to release
- `changeset version` updates package versions and changelogs
- `changeset publish` adds a git tag and publishes to NPM

## Usage Notes
- Adding `private: true` to a package.json will prevent it from being published to NPM
- Use `publishConfig` in package.json when publishing scoped packages (@acme/xxx) with `public` for publicly available packages and `restricted` for private packages.
- The [Changesets GitHub Action](https://github.com/changesets/action) with the [Changeset GitHub Bot](https://github.com/apps/changeset-bot) will create a PR after a PR with a changeset has been merged. Merging the PR created by Changeset automations will publish to NPM, update Git tags, and create a GitHub release.
