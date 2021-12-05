export const parseNestedDate = (keys: string[], object: object) =>
  Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (!keys.includes(key)) {
        return [key, value];
      }

      return [key, new Date(value)];
    }),
  );
