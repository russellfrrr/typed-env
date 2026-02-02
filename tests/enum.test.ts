import { describe, it, expect } from 'vitest';
import { createEnv, enum_ } from '../src';

describe('enum parser', () => {
  it('parses valid values', () => {
    process.env.NODE_ENV = 'dev';

    const env = createEnv({
      NODE_ENV: enum_(['dev', 'prod', 'test']),
    });

    expect(env.NODE_ENV).toBe('dev');

    delete process.env.NODE_ENV;
  });

  it('throws on invalid values', () => {
    process.env.NODE_ENV = 'staging';

    expect(() =>
      createEnv({
        NODE_ENV: enum_(['dev', 'prod', 'test']),
      })
    ).toThrow('Invalid value');

    delete process.env.NODE_ENV;
  });
});
