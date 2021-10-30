import { hasOwnProperty } from 'utils/hasOwnProperty';
import { isDateString } from 'utils/isDate';
import { isEmail } from 'utils/isEmail';
import { isPhoneNumber } from 'utils/isPhoneNumber';

import {
  CreateParticipantRequestDTO,
  UpdateParticipantRequestDTO,
} from './participants.dto';
import { NewParticipant } from './participants.types';

function checkIfKeyIsOfType(obj: object, key: string, type: string) {
  return hasOwnProperty(obj, key) && typeof obj[key] === type;
}

const getIsPhoneNumberValid = (participant: object) => {
  if (!hasOwnProperty(participant, 'phonenumber')) {
    return true;
  }

  if (
    participant.phonenumber === null ||
    typeof participant.phonenumber !== 'string'
  ) {
    return false;
  }

  return isPhoneNumber(participant.phonenumber);
};

const isCreateParticipantValid = (
  participant: unknown,
): participant is NewParticipant => {
  if (typeof participant !== 'object' || participant === null) {
    return false;
  }

  const isPhoneNumberValid = getIsPhoneNumberValid(participant);

  const isEmailValid =
    hasOwnProperty(participant, 'email') &&
    typeof participant.email === 'string' &&
    isEmail(participant.email);

  const isDobValid =
    hasOwnProperty(participant, 'dob') &&
    typeof participant.dob === 'string' &&
    isDateString(participant.dob);

  return (
    !hasOwnProperty(participant, 'id') &&
    checkIfKeyIsOfType(participant, 'name', 'string') &&
    checkIfKeyIsOfType(participant, 'surname', 'string') &&
    isPhoneNumberValid &&
    isDobValid &&
    isEmailValid
  );
};

export const isCreateParticipantBodyValid = (
  body: unknown,
): body is CreateParticipantRequestDTO => {
  if (typeof body !== 'object' || body === null) {
    return false;
  }

  if (!hasOwnProperty(body, 'participant')) {
    return false;
  }

  return isCreateParticipantValid(body.participant);
};

const isUpdateParticipantValid = (
  participant: unknown,
): participant is NewParticipant => {
  if (typeof participant !== 'object' || participant === null) {
    return false;
  }

  if (hasOwnProperty(participant, 'id')) {
    return false;
  }

  const isPhoneNumberValid = getIsPhoneNumberValid(participant);
  const isNameValid =
    !hasOwnProperty(participant, 'name') ||
    checkIfKeyIsOfType(participant, 'name', 'string');

  const isSurnameValid =
    !hasOwnProperty(participant, 'surname') ||
    checkIfKeyIsOfType(participant, 'surname', 'string');

  const isDobValid = !hasOwnProperty(participant, 'dob')
    ? true
    : typeof participant.dob === 'string' && isDateString(participant.dob);

  const isEmailValid = !hasOwnProperty(participant, 'email')
    ? true
    : typeof participant.email === 'string' && isEmail(participant.email);

  return (
    isPhoneNumberValid &&
    isNameValid &&
    isSurnameValid &&
    isDobValid &&
    isEmailValid
  );
};

export const isUpdateParticipantBodyValid = (
  body: unknown,
): body is UpdateParticipantRequestDTO => {
  if (typeof body !== 'object' || body === null) {
    return false;
  }

  if (!hasOwnProperty(body, 'participant')) {
    return false;
  }

  return isUpdateParticipantValid(body.participant);
};
