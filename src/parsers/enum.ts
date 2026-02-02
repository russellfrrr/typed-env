import { Parser } from './parser';

export const enum_ = <T extends readonly string[]>(values: T): Parser<T[number]> => {
  const allowed = new Set(values);

  return {
    parse(value, key) {
      if (value === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
      }

      if (!allowed.has(value)) {
        throw new Error(`Invalid value for ${key}. Expected one of: ${values.join(', ')}`);
      }

      return value as T[number];
    },

    optional() {
      return {
        parse(value, key) {
          if (value === undefined) {
            return undefined;
          }

          if (!allowed.has(value)) {
            throw new Error(`Invalid value for ${key}. Expected one of: ${values.join(', ')}`);
          }

          return value as T[number];
        },
        optional: this.optional,
        default: this.default,
      }
    },

    default(defaultValue: T[number]) {
      return {
        parse(value, key) {
          if (value === undefined) {
            return defaultValue;
          }

          if (!allowed.has(value)) {
            throw new Error(`Invalid value for ${key}. Expected one of ${values.join(', ')}`);
          }

          return value as T[number];
        },
        optional: this.optional,
        default: this.default,
      }
    }
  }
}