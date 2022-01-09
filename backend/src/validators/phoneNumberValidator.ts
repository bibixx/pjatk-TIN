import * as T from 'typed';

const PHONE_NUMBER_REGEX = /\d{3} \d{3} \d{3}/;

export const phoneNumberValidator = T.map(T.string, (value) => {
  return PHONE_NUMBER_REGEX.test(value)
    ? T.success(value)
    : T.failure(T.toError(`Expecting string to be a valid 'phone number'`));
});
