import cn from 'classnames';
import { useField, UseFieldConfig } from 'react-final-form';
import { useTranslation } from 'react-i18next';

interface Props<FieldValue>
  extends Omit<React.HTMLProps<HTMLInputElement>, 'label'> {
  name: string;
  required?: boolean;
  label: React.ReactNode;
  info?: React.ReactNode;
  validate?: UseFieldConfig<FieldValue>['validate'];
  format?: UseFieldConfig<FieldValue>['format'];
  parse?: UseFieldConfig<FieldValue>['parse'];
}

export function Input<FieldValue extends string | number | Date | undefined>({
  name,
  required = false,
  label,
  info,
  validate,
  format,
  parse,
  disabled,
  ...rest
}: Props<FieldValue>) {
  const { input, meta } = useField(name, { validate, format, parse });
  const shouldShowError = Boolean(meta.error && meta.touched);
  const { t } = useTranslation();

  return (
    <div
      className={cn('input', {
        'input--has-error': shouldShowError,
      })}
    >
      <label
        htmlFor={name}
        className={cn('input__label', {
          'input__label--disabled': disabled,
        })}
      >
        {label} {!required && <span>({t('shared.optional')})</span>}
      </label>
      <input
        className="input__element"
        id={name}
        /* eslint-disable react/jsx-props-no-spreading */
        {...input}
        {...rest}
        /* eslint-enable react/jsx-props-no-spreading */
        disabled={disabled}
      />
      {shouldShowError && (
        <div className="input__info input__info--danger">{meta.error}</div>
      )}
      {info && <div className="input__info">{info}</div>}
    </div>
  );
}
