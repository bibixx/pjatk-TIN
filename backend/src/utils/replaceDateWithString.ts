import { ReplaceDateWithNumber } from '@s19192/shared';

export const replaceDateWithTimestamp = <T>(
  object: T,
): ReplaceDateWithNumber<T> => {
  const entries = Object.entries(object);
  const mappedEntries = entries.map(([key, value]) => [
    key,
    value instanceof Date ? value.valueOf() : value,
  ]);

  return Object.fromEntries(mappedEntries);
};
