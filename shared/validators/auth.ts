import * as T from 'typed';
import { participantValidatorFields } from './participants';

export const loginValidatorFields = {
  username: T.string,
  password: T.string,
}

export const loginValidator = T.object(loginValidatorFields);

export const registerValidatorFields = {
  ...participantValidatorFields,
  ...loginValidatorFields,
}

export const registerValidator = T.object(registerValidatorFields);
