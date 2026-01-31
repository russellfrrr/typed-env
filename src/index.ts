export type Parser<T> = {
  parse(value: string | undefined): T;
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