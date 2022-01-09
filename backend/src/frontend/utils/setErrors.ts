export const setErrors = (
  fieldNames: string[],
  errors: Record<string, string>,
) => {
  const errorElements = fieldNames.map((fieldName) => {
    const wrapperElement = document.querySelector(`#${fieldName}-wrapper`);
    const errorInfoElement =
      wrapperElement?.querySelector(`.input__info--danger`);

    return {
      fieldName,
      wrapperElement,
      errorInfoElement,
    };
  });

  errorElements.forEach(({ fieldName, wrapperElement, errorInfoElement }) => {
    if (!wrapperElement || !errorInfoElement) {
      return;
    }

    /* eslint-disable no-param-reassign */
    if (Object.prototype.hasOwnProperty.call(errors, fieldName)) {
      wrapperElement.classList.add('input--has-error');
      errorInfoElement.classList.remove('input__info--hidden');
      errorInfoElement.textContent = errors[fieldName] ?? '';
    } else {
      wrapperElement.classList.remove('input--has-error');
      errorInfoElement.classList.add('input__info--hidden');
      errorInfoElement.textContent = '';
    }
    /* eslint-enable */
  });
};
