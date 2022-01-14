import * as T from 'typed';

export const loginValidatorFields = {
  username: T.string,
  password: T.string,
}

export const loginValidator = T.object(loginValidatorFields);
