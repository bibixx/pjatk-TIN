import * as T from 'typed';
import { errorsFromEntries } from 'utils/errorsFromEntries';
import { setErrors } from './setErrors';

export const validateFormAndUpdateErrors = <Validator extends T.Typed>(
  formFieldsNames: string[],
  validator: Validator,
) => {
  const data = formFieldsNames.reduce((acc, fieldName) => {
    const selector = `[name="${fieldName}"]`;
    const $element = document.querySelector(selector) as HTMLInputElement;

    return {
      ...acc,
      [fieldName]: $element.value,
    };
  }, {});

  const validationResult = validator(data);

  if (validationResult.success) {
    return true;
  }

  const errors = errorsFromEntries(validationResult.errors) || {};
  setErrors(formFieldsNames, errors);

  document
    .querySelector('.form__global-error-message')
    ?.classList.add('form__global-error-message--visible');

  return false;
};
