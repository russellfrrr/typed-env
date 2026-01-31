export const string = () => {
  return {
    parse(value: string | undefined): string {
      if (value === undefined) {
        throw new Error('Missing env var');
      }

      return value;
    },
  }
}

export const number = () => {
  return {
    parse(value: string | undefined): number {
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