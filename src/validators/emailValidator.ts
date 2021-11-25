import * as T from 'typed';

const EMAIL_REGEX = /^[a-z.+0-9]+@[a-z.0-9]+\.[a-z]{2,}$/i;

export const emailValidator = T.map(T.string, (value) => {
  return EMAIL_REGEX.test(value)
    ? T.success(value)
    : T.failure(T.toError(`Expecting string to be a valid 'email'`));
});
