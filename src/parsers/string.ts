import { Parser } from './parser';

export const string = (): Parser<string> => {
  return {
    parse(value, key) {
      if (value === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
      }

      return value;
    },

    optional() {
      return {
        parse(value, key) {
          if (value === undefined) {
            return undefined;
          }
          return value;
        },
        optional: this.optional,
        default: this.default,
      }
    },

    default(defaultValue: string) {
      return {
        parse(value, key) {
          if (value === undefined) {
            return defaultValue;
          }
          return value;
        },
        optional: this.optional,
        default: this.default,
      }
    }
  }
}