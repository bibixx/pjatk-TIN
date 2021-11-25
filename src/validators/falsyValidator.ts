import * as T from 'typed';

export const falsyValidator = T.map(T.any, (value) => {
  return !value
    ? T.success(value)
    : T.failure(T.toError('Expecting value to be empty'));
});
