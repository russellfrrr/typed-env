# typed-env

[![npm version](https://img.shields.io/npm/v/@russellfrrr/typed-env)](https://www.npmjs.com/package/@russellfrrr/typed-env)
[![license](https://img.shields.io/npm/l/@russellfrrr/typed-env)](LICENSE)

A tiny TypeScript utility for turning environment variables into a typed,
validated config object.

`typed-env` is inspired by schema validators like Zod, but it stays focused on
one job: parsing `process.env` early, clearly, and with useful inferred types.

## Why

Environment variables often start as strings, get parsed by hand, and fail only
after the app has already started doing real work.

`typed-env` lets you define the shape of your runtime config once:

- missing values fail fast
- invalid values produce clear errors
- parsed values are inferred by TypeScript
- defaults and optional values stay close to the variable definition

## Install

```bash
npm install @russellfrrr/typed-env
```

## Usage

```ts
import { boolean, createEnv, enum_, number, string } from '@russellfrrr/typed-env';

const env = createEnv({
  NODE_ENV: enum_(['dev', 'prod', 'test']).default('dev'),
  PORT: number().default(3000),
  DEBUG: boolean().optional(),
  DATABASE_URL: string(),
});

// env is inferred as:
// {
//   NODE_ENV: 'dev' | 'prod' | 'test';
//   PORT: number;
//   DEBUG: boolean | undefined;
//   DATABASE_URL: string;
// }
```

By default, `createEnv` reads from `process.env`. You can also pass an env-like
source, which is useful for tests or framework-specific config loading:

```ts
const env = createEnv(
  {
    PORT: number(),
    DEBUG: boolean().default(false),
  },
  {
    PORT: '4000',
  }
);
```

## Parsers

### `string()`

Requires a present string value. Empty strings are preserved.

### `number()`

Parses with `Number()` and throws when the result is `NaN`.

### `boolean()`

Accepts only `"true"` and `"false"`.

### `enum_(values)`

Restricts a value to a fixed list of strings and infers the literal union.

```ts
const env = createEnv({
  NODE_ENV: enum_(['dev', 'prod', 'test']),
});

// env.NODE_ENV is 'dev' | 'prod' | 'test'
```

## Modifiers

Every parser supports `optional()` and `default(value)`.

```ts
const env = createEnv({
  OPTIONAL_VALUE: string().optional(),
  PORT: number().default(3000),
});
```

Present values are still validated when a parser is optional or defaulted.

## Errors

`createEnv` throws regular `Error` instances with messages like:

- `Missing environment variable: PORT`
- `Invalid number for PORT`
- `Invalid boolean for DEBUG`
- `Invalid value for NODE_ENV. Expected one of: dev, prod, test`

## Non-goals

- This is not a full schema validation library.
- This does not replace Zod, Valibot, or similar tools for general validation.
- This library intentionally focuses on environment variables.

## Development

```bash
npm test
npm run build
```

## License

ISC
