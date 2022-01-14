import * as T from 'typed';
import { truthyValidator } from './utils/truthyValidator';

export const tripValidatorFields = {
  name: T.map(T.string, truthyValidator),
  price: T.number,
  startoftripdate: T.asDate,
  idhotel: T.number,
}

export const tripValidator = T.object(tripValidatorFields)
