import * as T from 'typed';
import { truthyValidator } from 'validators/truthyValidator';

export const hotelValidator = T.object({
  name: T.map(T.string, truthyValidator),
  numberofstars: T.map(T.asNumber, truthyValidator),
});
