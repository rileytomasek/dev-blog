---
title: Reusable EdgeDB filters with e.shape()
publish_date: 2022-10-11
description: Don't write the same filter twice
---

The [EdgeDB TypeScript client](https://www.edgedb.com/docs/clients/js/index) recently added [`e.shape()`](https://www.edgedb.com/docs/clients/js/select#portable-shapes) for portable shapes, but it also works well for DRYing out your filters.

When working with backlinks, you often end up repeating filters at differnt depths like this:

```ts
e.select(e.Profile, (profile) => ({
  // ...
  filter: e.op(
    e.op(profile.username, '=', username),
    'and',
    e.op(profile.platform, '=', platform)
  ),
}));

e.select(e.Person, () => ({
  // ...
  profile: (profile) => ({
    // ...
    filter: e.op(
      e.op(profile.username, '=', username),
      'and',
      e.op(profile.platform, '=', platform)
    ),
  }),
}));
```

With `e.shape()` you can reuse the filter code:

```ts
const profileFilter = (username: string, platform: string) => {
  return e.shape(e.Profile, (profile) => ({
    filter: e.op(
      e.op(profile.username, '=', username),
      'and',
      e.op(profile.platform, '=', platform)
    ),
  });
}

e.select(e.Profile, (profile) => ({
  // ...
  ...profileFilter(username, platform),
}));

e.select(e.Person, () => ({
  // ...
  igProfile: (profile) => ({
    // ...
  ...profileFilter(username, platform),
  }),
}));
```

These examples use a simple filter for clarity, but in practice this can save a ton of repeated code if you have complex filters.
