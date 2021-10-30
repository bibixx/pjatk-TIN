const PHONE_NUMBER_REGEX = /\d{3} \d{3} \d{3}/;

export const isPhoneNumber = (phoneNumber: string) =>
  PHONE_NUMBER_REGEX.test(phoneNumber);
