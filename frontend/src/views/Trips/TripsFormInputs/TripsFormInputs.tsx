import { GetHotelsResponseDTO, tripValidatorFields } from '@s19192/shared';
import { Input } from 'components/Input/Input';
import { Select } from 'components/Select/Select';
import { useTranslation } from 'react-i18next';
import { formatTimestamp } from 'utils/formatTimestamp';
import { validateField } from 'utils/validateField';
import { parseStartOfTripDate } from './TripsFormInputs.utils';

interface Props {
  disabled?: boolean;
  hotels?: GetHotelsResponseDTO['hotels'];
}

export const TripsFormInputs = ({ disabled = false, hotels }: Props) => {
  const { t } = useTranslation();

  const hotelsListItems = hotels?.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  return (
    <>
      <Input
        name="name"
        label={t('trips.details.fields.name')}
        required
        validate={validateField(tripValidatorFields.name)}
        disabled={disabled}
      />
      <Input
        name="price"
        required
        label={t('trips.details.fields.price')}
        validate={validateField(tripValidatorFields.price)}
        parse={(value) => +value}
        disabled={disabled}
        type="number"
      />
      <Input
        name="startoftripdate"
        type="date"
        required
        label={t('trips.details.fields.startoftripdate')}
        format={(value) => formatTimestamp(value as number)}
        parse={parseStartOfTripDate}
        validate={validateField(tripValidatorFields.startoftripdate)}
        disabled={disabled}
      />
      {hotelsListItems && (
        <Select
          name="idhotel"
          label={t('trips.details.fields.idhotel')}
          validate={validateField(tripValidatorFields.idhotel)}
          disabled={disabled}
          parse={(value) => +value}
          required
          options={hotelsListItems}
          defaultOption={t('trips.details.fields.defaultIdhotel')}
        />
      )}
    </>
  );
};
