import { Parser } from './parser';

export const boolean = (): Parser<boolean> => {
  return {
    parse(value) {
      if (value === undefined) {
        throw new Error('Missing env var');
      }

      if (value === 'true') return true;
      if (value === 'false') return false;

      throw new Error('Invalid boolean');
    },

    optional() {
      return {
        parse(value) {
          if (value === undefined) {
            return undefined;
          }

          if (value === 'true') return true;
          if (value === 'false') return false;

          throw new Error('Invalid boolean');
        },
        optional: this.optional,
        default: this.default,
      }
    },

    default(defaultValue: boolean) {
      return {
        parse(value) {
          if (value === undefined) {
            return defaultValue;
          }
          
          if (value === 'true') return true;
          if (value === 'false') return false;

          throw new Error('Invalid boolean');
        },
        optional: this.optional,
        default: this.default,
      }
    }
  }
}