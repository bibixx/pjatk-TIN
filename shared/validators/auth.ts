import * as T from 'typed';
import { participantValidatorFields } from './participants';
import { truthyValidator } from './utils/truthyValidator';

export const loginValidatorFields = {
  username: T.map(T.string, truthyValidator),
  password: T.map(T.string, truthyValidator),
}

export const loginValidator = T.object(loginValidatorFields);

export const registerValidatorFields = {
  ...participantValidatorFields,
  ...loginValidatorFields,
}

export const registerValidator = T.object(registerValidatorFields);
