import { Parser, createParser } from './parser';

export const string = (): Parser<string> => {
  return createParser((value, key) => {
    if (value === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }

    return value;
  });
};
