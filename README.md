# typed-env

[![npm version](https://img.shields.io/npm/v/@russellfrrr/typed-env)](https://www.npmjs.com/package/@russellfrrr/typed-env)
[![license](https://img.shields.io/npm/l/@russellfrrr/typed-env)](LICENSE)

A small TypeScript utility for **type-safe environment variables** with
runtime validation and clear error messages.

Inspired by schema validators like Zod, but **focused only on env vars**.

## Why?

In most Node / MERN apps, environment variables are:
- untyped
- parsed manually
- validated too late (or not at all)

**typed-env** lets you define a schema for `process.env` so errors happen
early and types are inferred automatically.

---

## Features

- Strongly-typed `process.env` parsing
- Built-in `string`, `number`, and `boolean` parsers
- `optional()` and `default()` helpers
- Simple schema-based API

## Non-Goals

- This is not a full schema validation library
- This does not replace tools like Zod for general data validation
- This library focuses only on `process.env`

## Install

```bash
npm install typed-env
```

## Usage

```ts
import { createEnv, string, number, boolean } from 'typed-env';

const env = createEnv({
  NODE_ENV: string(),
  PORT: number().default(3000),
  DEBUG: boolean().optional(),
  DATABASE_URL: string(),
});

// env is fully typed:
// {
//   NODE_ENV: string;
//   PORT: number;
//   DEBUG: boolean | undefined;
//   DATABASE_URL: string;
// }
```

## Parsers

### `string()`
- Required by default
- Use `.optional()` or `.default(value)` to adjust behavior

### `number()`
- Parses with `Number()` and throws on `NaN`

### `boolean()`
- Accepts only `"true"` and `"false"`

### `enum_(values)`

Restricts an environment variable to a fixed set of allowed string values.

```ts
import { createEnv, enum_ } from 'typed-env';

const env = createEnv({
  NODE_ENV: enum_(['dev', 'prod', 'test']),
});

// type of env.NODE_ENV:
// 'dev' | 'prod' | 'test'
```

## Optional and Default

```ts
const env = createEnv({
  OPTIONAL_VALUE: string().optional(),
  PORT: number().default(3000),
});
```

## Errors

When a required variable is missing or invalid, `createEnv` throws an `Error` with a helpful message like:

- `Missing environment variable: PORT`
- `Invalid number for PORT`
- `Invalid boolean for DEBUG`

## Testing

This project includes automated tests using Vitest to verify
runtime behavior of all parsers.

```bash
npm test
```

## API

### `createEnv(schema)`
Parses `process.env` using the provided schema and returns a typed object.

### `Parser<T>`
Each parser implements:
- `parse(value: string | undefined, key: string): T`
- `optional(): Parser<T | undefined>`
- `default(value: T): Parser<T>`

## License

ISC
