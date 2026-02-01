import { Parser } from './parsers/parser';

export type Schema = Record<string, Parser<any>>;

export type InferEnv<T extends Schema> = {
  [K in keyof T]: T[K] extends Parser<infer R> ? R : never;
}
