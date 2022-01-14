import { hotelValidatorFields } from '@s19192/shared';
import { Input } from 'components/Input/Input';
import { useTranslation } from 'react-i18next';
import { validateField } from 'utils/validateField';

interface Props {
  disabled?: boolean;
}

export const HotelsFormInputs = ({ disabled = false }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Input
        name="name"
        required
        label={t('hotels.details.fields.name')}
        validate={validateField(hotelValidatorFields.name)}
        disabled={disabled}
      />
      <Input
        name="numberofstars"
        required
        type="number"
        label={t('hotels.details.fields.numberOfStars')}
        validate={validateField(hotelValidatorFields.numberofstars)}
        parse={(v) => Math.max(Math.min(5, +v), 1)}
        min="1"
        max="5"
        disabled={disabled}
      />
    </>
  );
};
