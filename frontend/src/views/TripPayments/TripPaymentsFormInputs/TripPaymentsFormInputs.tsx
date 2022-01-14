import {
  GetParticipantsResponseDTO,
  GetTripsResponseDTO,
  tripParticipantValidatorFields,
} from '@s19192/shared';
import { Input } from 'components/Input/Input';
import { Select } from 'components/Select/Select';
import { useTranslation } from 'react-i18next';
import { formatTimestamp } from 'utils/formatTimestamp';
import { validateField } from 'utils/validateField';
import { parsePaymentDate } from './TripPaymentsFormInputs.utils';

interface Props {
  disabled?: boolean;
  participants?: GetParticipantsResponseDTO['participants'];
  trips?: GetTripsResponseDTO['trips'];
}

export const TripPaymentsFormInputs = ({
  disabled = false,
  participants,
  trips,
}: Props) => {
  const { t } = useTranslation();

  const participantsListItems = participants?.map(({ name, surname, id }) => ({
    label: `${name} ${surname}`,
    value: id,
  }));

  const tripsListItems = trips?.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  return (
    <>
      <Input
        name="dateofpayment"
        type="date"
        label={t('tripParticipants.details.fields.dateofpayment')}
        format={(value) => formatTimestamp(value as number)}
        parse={parsePaymentDate}
        validate={validateField(tripParticipantValidatorFields.dateofpayment)}
        disabled={disabled}
      />
      <Input
        name="discount"
        label={t('tripParticipants.details.fields.discount')}
        validate={validateField(tripParticipantValidatorFields.discount)}
        parse={(value) => +value}
        disabled={disabled}
        type="number"
      />
      {participantsListItems && (
        <Select
          name="idparticipant"
          label={t('tripParticipants.details.fields.idparticipant')}
          validate={validateField(tripParticipantValidatorFields.idparticipant)}
          disabled={disabled}
          parse={(value) => +value}
          required
          options={participantsListItems}
          defaultOption={t(
            'tripParticipants.details.fields.defaultIdparticipant',
          )}
        />
      )}
      {tripsListItems && (
        <Select
          name="idtrip"
          label={t('tripParticipants.details.fields.idtrip')}
          validate={validateField(tripParticipantValidatorFields.idtrip)}
          disabled={disabled}
          parse={(value) => +value}
          required
          options={tripsListItems}
          defaultOption={t('tripParticipants.details.fields.defaultIdtrip')}
        />
      )}
    </>
  );
};
