import { participantValidatorFields } from '@s19192/shared';
import { Input } from 'components/Input/Input';
import { useTranslation } from 'react-i18next';
import { formatTimestamp } from 'utils/formatTimestamp';
import { validateField } from 'utils/validateField';
import { parseDob } from './ParticipantsFormInputs.utils';

interface Props {
  disabled?: boolean;
}

export const ParticipantsFormInputs = ({ disabled = false }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Input
        name="name"
        required
        label={t('participants.details.fields.name')}
        validate={validateField(participantValidatorFields.name)}
        disabled={disabled}
      />
      <Input
        name="surname"
        required
        label={t('participants.details.fields.surname')}
        validate={validateField(participantValidatorFields.surname)}
        disabled={disabled}
      />
      <Input
        name="dob"
        type="date"
        required
        label={t('participants.details.fields.dob')}
        format={(value) => formatTimestamp(value as number)}
        parse={parseDob}
        validate={validateField(participantValidatorFields.dob)}
        disabled={disabled}
      />
      <Input
        name="email"
        required
        label={t('participants.details.fields.email')}
        validate={validateField(participantValidatorFields.email)}
        disabled={disabled}
      />
      <Input
        name="phonenumber"
        label={t('participants.details.fields.phonenumber')}
        disabled={disabled}
        validate={validateField(participantValidatorFields.phonenumber)}
        info={!disabled && t('participants.details.fields.phonenumberFormat')}
      />
    </>
  );
};
