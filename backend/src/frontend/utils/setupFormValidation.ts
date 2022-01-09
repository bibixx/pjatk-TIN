import * as T from 'typed';
import { validateFormAndUpdateErrors } from './validateFormAndUpdateErrors';

export const setupFormValidation = <Validator extends T.Typed>(
  validator: Validator,
  formFieldsNames: string[],
) => {
  const $form = document.querySelector('form');

  const validateForm = () =>
    validateFormAndUpdateErrors(formFieldsNames, validator);

  let wasFormSubmitted = false;
  $form?.addEventListener('submit', (e) => {
    wasFormSubmitted = true;
    const isFormValid = validateForm();

    if (!isFormValid) {
      e.preventDefault();
    }
  });

  formFieldsNames.forEach((fieldName) => {
    const selector = `[name="${fieldName}"]`;
    const $element = document.querySelector(selector) as HTMLInputElement;

    $element.addEventListener('change', () => {
      if (wasFormSubmitted) {
        validateForm();
      }
    });
  });
};
