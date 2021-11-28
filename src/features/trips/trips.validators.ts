import * as T from 'typed';
import { truthyValidator } from 'validators/truthyValidator';

export const tripValidator = T.object({
  name: T.map(T.string, truthyValidator),
  price: T.map(T.map(T.string, truthyValidator), T.asNumber),
  startoftripdate: T.asDate,
  idhotel: T.map(T.map(T.string, truthyValidator), T.asNumber),
});
