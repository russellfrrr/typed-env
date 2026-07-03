export type Parser<T> = {
  parse(value: string | undefined, key: string): T;
  optional(): Parser<T | undefined>;
  default(value: T): Parser<T>;
};

type ParseFn<T> = (value: string | undefined, key: string) => T;

export function createParser<T>(parse: ParseFn<T>): Parser<T> {
  return {
    parse,

    optional() {
      return createParser((value, key) => {
        if (value === undefined) {
          return undefined;
        }

        return parse(value, key);
      });
    },

    default(defaultValue) {
      return createParser((value, key) => {
        if (value === undefined) {
          return defaultValue;
        }

        return parse(value, key);
      });
    },
  };
}
