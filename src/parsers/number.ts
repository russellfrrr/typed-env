import { Parser, createParser } from './parser';

export const number = (): Parser<number> => {
  return createParser((value, key) => {
    if (value === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }

    const parsed = Number(value);

    if (Number.isNaN(parsed)) {
      throw new Error(`Invalid number for ${key}`);
    }

    return parsed;
  });
};
