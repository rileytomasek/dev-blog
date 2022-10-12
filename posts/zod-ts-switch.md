---
title: Better switches with Zod and TypeScript
publish_date: 2022-10-07
description: Zod discriminated unions for type narrowing switch statements
og:image: https://assets.rile.yt/api/post?date=2022-10-07&title=Better%20switches%20with%20Zod%20and%20TypeScript
---

[Zod discriminated unions](https://github.com/colinhacks/zod#discriminated-unions) allow a switch case to perform automated type narrowing and cause a TypeScript error if a case is missed.

```ts
// This adds type narrowing by the intent property
const Schema = z.discriminatedUnion('intent', [
  z.object({ intent: z.literal('delete'), id: z.string() }),
  z.object({ intent: z.literal('create'), name: z.string() }),
]);

const data = Schema.parse({ intent: 'delete', id: '123' });

switch (data.intent) {
  case 'delete':
    // data is now narrowed to { intent: 'delete', id: string }
    return;
  case 'create':
    // data is now narrowed to { intent: 'create', name: string }
    return;
  default:
    // data is now narrowed to never. This will error if a case is missing.
    const _exhaustiveCheck: never = data;
}
```
