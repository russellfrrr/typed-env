import { Parser, createParser } from './parser';

export const boolean = (): Parser<boolean> => {
  return createParser((value, key) => {
    if (value === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }

    if (value === 'true') return true;
    if (value === 'false') return false;

    throw new Error(`Invalid boolean for ${key}`);
  });
};
