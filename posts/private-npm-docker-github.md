---
title: Private NPM packages with Docker and GitHub Actions
publish_date: 2022-10-05
description: How to build Docker images using private NPM packages with GitHub Actions.
og:image: https://assets.rile.yt/api/post?date=2022-10-05&title=Private%20NPM%20packages%20with%20Docker%20and%20GitHub%20Actions
---

Follow these steps to use private NPM packages when deploying applications using the [docker/build-push-action]( https://github.com/docker/build-push-action ) GitHub Action.

- Create an [automation access token](https://docs.npmjs.com/creating-and-viewing-access-tokens) (that doesn't require 2FA)
- Set it as the `NPM_TOKEN` [action secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- Add the following to the workflow to create a `.npmrc` file with the token:

```yaml
- name: Authenticate NPM
  run: echo "//registry.npmjs.org/:_authToken=${{ secrets.NPM_TOKEN }}" > ~/.npmrc
```

- Update the build and push step of the workflow

```yaml
- name: Build and push
  uses: docker/build-push-action@v3
  with:
    # This passes .npmrc to the build context
    secret-files: |
      "npmrc=./.npmrc"
```

- Use the `.npmrc` secret in the Dockerfile to install private packages

```docker
RUN --mount=type=secret,id=npmrc,dst=/app/.npmrc npm install
```
