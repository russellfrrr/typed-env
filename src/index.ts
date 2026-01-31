export type Parser<T> = {
  parse(value: string | undefined): T;
}

type Schema = Record<string, Parser<any>>;

type InferEnv<T extends Schema> = {
  [K in keyof T]: T[K] extends Parser<infer R> ? R : never;
}

export const string = (): Parser<string> => {
  return {
    parse(value: string | undefined) {
      if (value === undefined) {
        throw new Error('Missing env var');
      }

      return value;
    },
  }
}

export const number = (): Parser<number> => {
  return {
    parse(value: string | undefined) {
      if (value === undefined) {
        throw new Error('Missing env var');
      }

      const parsed = Number(value);

      if (Number.isNaN(parsed)) {
        throw new Error('Invalid number');
      }

      return parsed;
    }
  }
}

export function createEnv<T extends Schema>(schema: T): InferEnv<T> {
  const result = {} as InferEnv<T>;

  for (const key in schema) {
    const parser = schema[key];
    const rawValue = process.env[key];

    result[key] = parser.parse(rawValue);
  }

  return result;
}