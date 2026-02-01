import { Schema, InferEnv } from './schema';

export function createEnv<T extends Schema>(schema: T): InferEnv<T> {
  const result = {} as InferEnv<T>;

  for (const key in schema) {
    const parser = schema[key];
    const rawValue = process.env[key];

    result[key] = parser.parse(rawValue);
  }

  return result;
}