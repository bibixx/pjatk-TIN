import { tripValidatorFields } from '@s19192/shared';
import { parseFromTyped } from 'utils/parseFromTyped';

export const parseStartOfTripDate = (value: any) => {
  if (!value) {
    return undefined;
  }

  return (
    parseFromTyped(tripValidatorFields.startoftripdate, value)?.valueOf() ??
    undefined
  );
};
