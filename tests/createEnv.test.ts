import { describe, expect, expectTypeOf, it } from 'vitest';
import { boolean, createEnv, number, string } from '../src';

describe('createEnv', () => {
  it('parses an env-like source without reading process.env', () => {
    process.env.PORT = '9999';

    const env = createEnv(
      {
        PORT: number(),
        DEBUG: boolean(),
      },
      {
        PORT: '3000',
        DEBUG: 'true',
      }
    );

    expect(env).toEqual({
      PORT: 3000,
      DEBUG: true,
    });

    delete process.env.PORT;
  });

  it('infers the parsed schema type', () => {
    const env = createEnv(
      {
        HOST: string(),
        PORT: number().default(3000),
        DEBUG: boolean().optional(),
      },
      {
        HOST: 'localhost',
      }
    );

    expectTypeOf(env).toEqualTypeOf<{
      HOST: string;
      PORT: number;
      DEBUG: boolean | undefined;
    }>();
  });
});
