import cn from 'classnames';
import { useField, UseFieldConfig } from 'react-final-form';
import { useTranslation } from 'react-i18next';

export interface SelectOption {
  value: string | number;
  label: React.ReactNode;
}

interface Props<FieldValue>
  extends Omit<React.HTMLProps<HTMLSelectElement>, 'label'> {
  name: string;
  required?: boolean;
  label: React.ReactNode;
  info?: React.ReactNode;
  options: SelectOption[];
  defaultOption?: string;
  validate?: UseFieldConfig<FieldValue>['validate'];
  format?: UseFieldConfig<FieldValue>['format'];
  parse?: UseFieldConfig<FieldValue>['parse'];
}

export function Select<FieldValue extends string | number | Date | undefined>({
  name,
  required = false,
  label,
  info,
  validate,
  format,
  parse,
  disabled,
  options,
  defaultOption,
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
      <select
        className="input__element"
        id={name}
        /* eslint-disable react/jsx-props-no-spreading */
        {...input}
        {...rest}
        /* eslint-enable react/jsx-props-no-spreading */
        disabled={disabled}
      >
        {defaultOption && !input.value && (
          <option value="__DEFAULT__">{defaultOption}</option>
        )}
        {options.map(({ value, label: optionLabel }) => (
          <option value={value} key={value}>
            {optionLabel}
          </option>
        ))}
      </select>
      {shouldShowError && (
        <div className="input__info input__info--danger">{meta.error}</div>
      )}
      {info && <div className="input__info">{info}</div>}
    </div>
  );
}
