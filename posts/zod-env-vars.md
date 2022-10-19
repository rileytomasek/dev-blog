---
title: Better environment variables with Zod and TypeScript
publish_date: 2022-10-19
description: Add type safety and validation to env vars
og:image: https://assets.rile.yt/api/post?date=2022-20-19&title=Better%20environment%20variables%20with%20Zod%20and%20TypeScript
---

Handling environment variables can be tricky and is often overlooked. Are you sure the value exists? Is it the correct type? Are you declaring globals to make TypeScript happy?

I've been using this simple helper function to parse, validate, and strictly type my environment variables in TypeScript projects:

```ts
// env-vars.ts
import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.union([
    z.literal('development'),
    z.literal('production'),
  ]),
  EDGEDB_DSN: z.string().nonempty(),
  SENTRY_DSN: z.string().nonempty(),
});

export function envVars() {
  const result = EnvSchema.safeParse(process.env);
  if (result.success) {
    return result.data;
  } else {
    throw new Error(
      `Missing required environment variables: ${result.error.message}`
    );
  }
}
```

Then you can call it from anywhere you need to access them:

```ts
import { envVars } from './env-vars';

// envVars() will throw if a value is missing or invalid
const { NODE_ENV, EDGEDB_DSN, SENTRY_DSN } = envVars();

// typeof NODE_ENV = 'development' | 'production'
// typeof EDGEDB_DSN / SENTRY_DSN = string
```

Throwing errors when environment variables are missing, or the even trickier case, when they are something like an empty string, surfaces the problem in a much easier to debug way. Otherwise, you end up with more obscure errors from the first time they are used.

This also tells TypeScript exactly what the value should be and that it exists, so you don't have to do nasty things like this:

```ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      EDGEDB_DSN: string;
      SENTRY_DSN: string;
    }
  }
}
```
