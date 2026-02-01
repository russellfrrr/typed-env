import { Parser } from './parser';

export const string = (): Parser<string> => {
  return {
    parse(value: string | undefined) {
      if (value === undefined) {
        throw new Error('Missing env var');
      }

      return value;
    },

    optional() {
      return {
        parse(value) {
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
        parse(value) {
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