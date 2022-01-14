import * as T from 'typed';
import { validateMinMax } from './utils/validateMinMax';

export const tripParticipantValidatorFields = {
  idparticipant: T.number,
  idtrip: T.number,
  // TODO: Expecting type 'number'. Got type 'null'
  // TODO: nullable
  discount: T.nullable(T.map(T.number, validateMinMax(0, 100))),
  dateofpayment: T.nullable(T.asDate),
}

export const tripParticipantValidator = T.object(tripParticipantValidatorFields);
