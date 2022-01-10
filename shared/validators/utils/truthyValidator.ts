import * as T from 'typed';

export const truthyValidator = <U>(value: U) => {
  return value
    ? T.success(value)
    : T.failure(T.toError('Expecting value not to be empty'));
};
