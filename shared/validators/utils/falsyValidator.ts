import * as T from 'typed';

export const falsyValidator = <U>(value: U) => {
  return !value
    ? T.success(value)
    : T.failure(T.toError('Expecting value to be empty'));
};
