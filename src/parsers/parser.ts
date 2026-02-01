export type Parser<T> = {
  parse(value: string | undefined, key: string): T;
  optional(): Parser<T | undefined>;
  default(value: T): Parser<T>;
}