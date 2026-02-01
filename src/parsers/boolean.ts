import { Parser } from './parser';

export const boolean = (): Parser<boolean> => {
  return {
    parse(value, key) {
      if (value === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
      }

      if (value === 'true') return true;
      if (value === 'false') return false;

      throw new Error(`Invalid boolean for ${key}`);
    },

    optional() {
      return {
        parse(value, key) {
          if (value === undefined) {
            return undefined;
          }

          if (value === 'true') return true;
          if (value === 'false') return false;

          throw new Error(`Invalid boolean for ${key}`);
        },
        optional: this.optional,
        default: this.default,
      }
    },

    default(defaultValue: boolean) {
      return {
        parse(value, key) {
          if (value === undefined) {
            return defaultValue;
          }
          
          if (value === 'true') return true;
          if (value === 'false') return false;

          throw new Error(`Invalid boolean for ${key}`);
        },
        optional: this.optional,
        default: this.default,
      }
    }
  }
}