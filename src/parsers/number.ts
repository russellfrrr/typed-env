import { Parser } from './parser';

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
    },

    optional() {
      return {
        parse(value) {
          if (value === undefined) {
            return undefined;
          }

          const parsed = Number(value);
          if(Number.isNaN(parsed)) {
            throw new Error('Invalid number');
          }

          return parsed;
        },
        optional: this.optional,
        default: this.default,
      }
    },

    default(defaultValue: number) {
      return {
        parse(value) {
          if (value === undefined) {
            return defaultValue;
          }

          const parsed = Number(value);
          if (Number.isNaN(parsed)) {
            throw new Error('Invalid number');
          }

          return parsed;
        },
        optional: this.optional,
        default: this.default,
      }
    }
  }
}