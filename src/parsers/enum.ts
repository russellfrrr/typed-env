import { Parser, createParser } from './parser';

export const enum_ = <const T extends readonly string[]>(values: T): Parser<T[number]> => {
  const allowed = new Set(values);

  return createParser((value, key) => {
    if (value === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }

    if (!allowed.has(value)) {
      throw new Error(`Invalid value for ${key}. Expected one of: ${values.join(', ')}`);
    }

    return value as T[number];
  });
};
