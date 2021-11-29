import * as T from 'typed';
import { validateMinMax } from 'utils/validateMinMax';
import { truthyValidator } from 'validators/truthyValidator';

export const hotelValidator = T.object({
  name: T.map(T.string, truthyValidator),
  numberofstars: T.map(
    T.map(T.string, truthyValidator),
    T.map(T.asNumber, validateMinMax(1, 5)),
  ),
});
