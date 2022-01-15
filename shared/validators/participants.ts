import * as T from 'typed';
import { emailValidator } from './utils/emailValidator';
import { truthyValidator } from './utils/truthyValidator';
import { phoneNumberValidator } from './utils/phoneNumberValidator';
import { optionalNullable } from './utils/optionalNullable';

export const participantValidatorFields = {
  name: T.map(T.string, truthyValidator),
  surname: T.map(T.string, truthyValidator),
  dob: T.asDate,
  email: emailValidator,
  phonenumber: optionalNullable(phoneNumberValidator)
};

export const participantValidator = T.object(participantValidatorFields);
