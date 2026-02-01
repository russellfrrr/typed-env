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
