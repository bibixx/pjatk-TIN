import * as T from 'typed';
import { emailValidator } from 'validators/emailValidator';
import { truthyValidator } from 'validators/truthyValidator';
import { phoneNumberValidator } from 'validators/phoneNumberValidator';
import { falsyValidator } from 'validators/falsyValidator';

export const participantValidator = T.object({
  name: T.map(T.string, truthyValidator),
  surname: T.map(T.string, truthyValidator),
  dob: T.asDate,
  email: T.map(T.map(T.string, truthyValidator), emailValidator),
  phonenumber: T.union(
    T.map(T.string, falsyValidator),
    T.nullable(phoneNumberValidator),
  ),
});
