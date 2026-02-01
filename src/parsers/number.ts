import { Parser } from './parser';

export const number = (): Parser<number> => {
  return {
    parse(value, key) {
      if (value === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
      }

      const parsed = Number(value);

      if (Number.isNaN(parsed)) {
        throw new Error(`Invalid number for ${key}`);
      }

      return parsed;
    },

    optional() {
      return {
        parse(value, key) {
          if (value === undefined) {
            return undefined;
          }

          const parsed = Number(value);
          if(Number.isNaN(parsed)) {
            throw new Error(`Invalid number for ${key}`);
          }

          return parsed;
        },
        optional: this.optional,
        default: this.default,
      }
    },

    default(defaultValue: number) {
      return {
        parse(value, key) {
          if (value === undefined) {
            return defaultValue;
          }

          const parsed = Number(value);
          if (Number.isNaN(parsed)) {
            throw new Error(`Invalid number for ${key}`);
          }

          return parsed;
        },
        optional: this.optional,
        default: this.default,
      }
    }
  }
}