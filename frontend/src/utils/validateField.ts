import { Typed } from 'typed';
import { translateError } from './translateError';

export const validateField =
  <T>(validator: Typed<T>) =>
  <U>(value: U) => {
    const result = validator(value);

    if (result.success) {
      return undefined;
    }

    return translateError(result.errors[0]?.message as string);
  };
