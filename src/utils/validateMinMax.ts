import * as T from 'typed';

export const validateMinMax = (min: number, max: number) =>
  T.map(T.number, (value) => {
    if (value === null) {
      return T.success(value);
    }

    if (value < min) {
      return T.failure(
        T.toError(`Expected value to be greater or equal to ${min}`),
      );
    }

    if (value > max) {
      return T.failure(
        T.toError(`Expected value to be smaller or equal to ${max}`),
      );
    }

    return T.success(value);
  });
