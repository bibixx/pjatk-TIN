import * as T from 'typed';

export const truthyValidator = T.map(T.any, (value) => {
  return value
    ? T.success(value)
    : T.failure(T.toError('Expecting value not to be empty'));
});
