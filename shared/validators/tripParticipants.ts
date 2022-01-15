import * as T from 'typed';
import { optionalNullable } from './utils/optionalNullable';
import { validateMinMax } from './utils/validateMinMax';

export const tripParticipantValidatorFields = {
  idparticipant: T.number,
  idtrip: T.number,
  discount: optionalNullable(T.map(T.number, validateMinMax(0, 100))),
  dateofpayment: optionalNullable(T.asDate),
}

export const tripParticipantValidator = T.object(tripParticipantValidatorFields);
