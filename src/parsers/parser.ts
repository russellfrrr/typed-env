export type Parser<T> = {
  parse(value: string | undefined): T;
  optional(): Parser<T | undefined>;
  default(value: T): Parser<T>;
}