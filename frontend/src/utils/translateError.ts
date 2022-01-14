const translateMap: Record<string, string> = {
  'Expecting value not to be empty': 'To pole jest wymagane',
  "Expecting value to be a valid 'date'": 'To pole nie jest poprawną datą',
  "Expecting value to be a finite 'number'": 'To pole nie jest poprawną liczbą',
  'Expected value to be greater or equal to 1':
    'To pole nie może być mniejsze od 1',
  'Expected value to be smaller or equal to 5':
    'To pole nie może być większe od 5',
  'Expected value to be greater or equal to 0':
    'To pole nie może być mniejsze od 0',
  'Expected value to be smaller or equal to 100':
    'To pole nie może być większe od 100',
  "Expecting string to be a valid 'phone number'":
    'To pole nie jest poprawnym numerem telefonu',
  "Expecting string to be a valid 'email'":
    'To pole nie jest poprawnym adresem email',
};

export const translateError = (error: string) => {
  if (error.endsWith("Got type 'undefined'")) {
    return 'To pole jest wymagane';
  }

  return translateMap[error] ?? error;
};
