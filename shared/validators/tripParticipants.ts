import * as T from 'typed';
import { validateMinMax } from './utils/validateMinMax';

export const tripParticipantValidatorFields = {
  idparticipant: T.number,
  idtrip: T.number,
  // TODO: Expecting type 'number'. Got type 'null'
  discount: T.optional(T.map(T.number, validateMinMax(0, 100))),
  dateofpayment: T.optional(T.asDate),
}

export const tripParticipantValidator = T.object(tripParticipantValidatorFields);
