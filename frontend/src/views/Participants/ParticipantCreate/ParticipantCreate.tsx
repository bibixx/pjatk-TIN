import {
  CreateParticipantRequestDTO,
  ReplaceDateWithNumber,
} from '@s19192/shared';
import { BackButton } from 'components/BackButton/BackButton';
import { Button } from 'components/Button/Button';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { PageContainerHeader } from 'components/PageContainerHeader/PageContainerHeader';
import { Form } from 'react-final-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from 'utils/makeRequest';
import { ParticipantsFormInputs } from '../ParticipantsFormInputs/ParticipantsFormInputs';

export const ParticipantCreate = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = async (
    values: ReplaceDateWithNumber<CreateParticipantRequestDTO>,
  ) => {
    try {
      await makeRequest(`/api/participants`, 'POST', values);

      toast.success(t('participants.toasts.addSuccess'));
      navigate('/participants');
    } catch (error) {
      toast.error(t('participants.toasts.error'));
    }
  };

  return (
    <PageContainer>
      <PageContainerHeader header={t('participants.create.header')} />
      <Form onSubmit={onSubmit}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <ParticipantsFormInputs />
            {props.submitFailed && props.hasValidationErrors && (
              <div className="form__global-error-message">
                {t('shared.formError')}
              </div>
            )}
            <div className="form__buttons-container">
              <Button type="submit" icon="add">
                {t('shared.add')}
              </Button>
              <BackButton muted>{t('shared.cancel')}</BackButton>
            </div>
          </form>
        )}
      </Form>
    </PageContainer>
  );
};
