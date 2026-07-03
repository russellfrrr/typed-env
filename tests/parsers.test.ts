import { describe, expect, expectTypeOf, it } from 'vitest';
import { boolean, enum_, number, string } from '../src';

describe('string parser', () => {
  it('returns string values as-is', () => {
    expect(string().parse('', 'EMPTY')).toBe('');
    expect(string().parse('hello', 'NAME')).toBe('hello');
  });

  it('throws when required values are missing', () => {
    expect(() => string().parse(undefined, 'DATABASE_URL')).toThrow(
      'Missing environment variable: DATABASE_URL'
    );
  });
});

describe('number parser', () => {
  it('parses numeric strings', () => {
    expect(number().parse('3000', 'PORT')).toBe(3000);
    expect(number().parse('0', 'PORT')).toBe(0);
  });

  it('throws for invalid numbers', () => {
    expect(() => number().parse('abc', 'PORT')).toThrow('Invalid number for PORT');
  });
});

describe('boolean parser', () => {
  it('parses true and false', () => {
    expect(boolean().parse('true', 'DEBUG')).toBe(true);
    expect(boolean().parse('false', 'DEBUG')).toBe(false);
  });

  it('throws for non-boolean strings', () => {
    expect(() => boolean().parse('1', 'DEBUG')).toThrow('Invalid boolean for DEBUG');
  });
});

describe('enum parser', () => {
  it('parses allowed values and preserves literal types', () => {
    const value = enum_(['dev', 'prod', 'test']).parse('prod', 'NODE_ENV');

    expect(value).toBe('prod');
    expectTypeOf(value).toEqualTypeOf<'dev' | 'prod' | 'test'>();
  });

  it('throws on invalid values', () => {
    expect(() => enum_(['dev', 'prod', 'test']).parse('staging', 'NODE_ENV')).toThrow(
      'Invalid value for NODE_ENV'
    );
  });
});

describe('parser modifiers', () => {
  it('returns undefined for missing optional values', () => {
    expect(string().optional().parse(undefined, 'OPTIONAL_VALUE')).toBeUndefined();
  });

  it('uses defaults only when values are missing', () => {
    expect(number().default(3000).parse(undefined, 'PORT')).toBe(3000);
    expect(number().default(3000).parse('4000', 'PORT')).toBe(4000);
  });

  it('still validates present values when optional or defaulted', () => {
    expect(() => boolean().optional().parse('yes', 'DEBUG')).toThrow(
      'Invalid boolean for DEBUG'
    );
    expect(() => number().default(3000).parse('abc', 'PORT')).toThrow(
      'Invalid number for PORT'
    );
  });
});
