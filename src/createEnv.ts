import { Schema, InferEnv } from './schema';

export type EnvSource = Record<string, string | undefined>;

export function createEnv<T extends Schema>(
  schema: T,
  source: EnvSource = process.env
): InferEnv<T> {
  const result = {} as InferEnv<T>;

  for (const key in schema) {
    const parser = schema[key];
    const rawValue = source[key];

    result[key] = parser.parse(rawValue, key);
  }

  return result;
}
