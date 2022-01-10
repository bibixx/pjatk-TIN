import * as T from 'typed';
import { emailValidator } from './utils/emailValidator';
import { truthyValidator } from './utils/truthyValidator';
import { phoneNumberValidator } from './utils/phoneNumberValidator';

export const participantValidatorFields = {
  name: T.map(T.string, truthyValidator),
  surname: T.map(T.string, truthyValidator),
  dob: T.asDate,
  email: T.map(T.map(T.string, truthyValidator), emailValidator),
  phonenumber: T.map(
    T.optional(T.nullable(phoneNumberValidator)),
    v => v === undefined ? T.success(null) : T.success(v)
  )
};

export const participantValidator = T.object(participantValidatorFields);
