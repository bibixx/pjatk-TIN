import { participantValidatorFields } from '@s19192/shared';
import { parseFromTyped } from 'utils/parseFromTyped';

export const parseDob = (value: any) => {
  if (!value) {
    return undefined;
  }

  return (
    parseFromTyped(participantValidatorFields.dob, value)?.valueOf() ??
    undefined
  );
};
