import * as T from 'typed';
import { validateMinMax } from './utils/validateMinMax';
import { truthyValidator } from './utils/truthyValidator';

export const hotelValidatorFields = {
  name: T.map(T.string, truthyValidator),
  numberofstars: T.map(T.number, validateMinMax(1, 5)),
}

export const hotelValidator = T.object(hotelValidatorFields);
