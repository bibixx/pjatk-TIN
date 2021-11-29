import * as T from 'typed';
import { validateMinMax } from 'utils/validateMinMax';
import { truthyValidator } from 'validators/truthyValidator';

const validateDateofpaymentType = T.map(T.string, (value) =>
  value === '' ? T.success(null) : T.asDate(value),
);

const validateDiscountType = T.map(T.string, (value) =>
  value === '' ? T.success(null) : T.asNumber(value),
);

export const tripParticipantValidator = T.object({
  idtrip: T.map(T.map(T.string, truthyValidator), T.asNumber),
  idparticipant: T.map(T.map(T.string, truthyValidator), T.asNumber),
  discount: T.map(validateDiscountType, T.nullable(validateMinMax(0, 100))),
  dateofpayment: validateDateofpaymentType,
});
