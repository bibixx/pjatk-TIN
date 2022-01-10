import {
  GetParticipantResponseDTO,
  ReplaceDateWithNumber,
  UpdateParticipantRequestDTO,
} from '@s19192/shared';
import { BackButton } from 'components/BackButton/BackButton';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { PageContainerHeader } from 'components/PageContainerHeader/PageContainerHeader';
import { Form } from 'react-final-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from 'utils/fetcher';
import { makeRequest } from 'utils/makeRequest';
import { ParticipantsFormInputs } from '../ParticipantsFormInputs/ParticipantsFormInputs';

export const ParticipantEditDetails = () => {
  const { id } = useParams<'id'>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: participantData } = useSWR<GetParticipantResponseDTO>(
    `/api/participants/${id}`,
    fetcher,
  );

  const onSubmit = async (
    values: ReplaceDateWithNumber<UpdateParticipantRequestDTO>,
  ) => {
    try {
      await makeRequest(`/api/participants/${id}`, 'PUT', values);

      toast.success(t('participants.toasts.editSuccess'));
      navigate('/participants');
    } catch (error) {
      toast.error(t('participants.toasts.error'));
    }
  };

  const participant = participantData?.participant;

  if (participant === undefined) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageContainerHeader header={t('participants.details.header.text')} />
      <Form onSubmit={onSubmit} initialValues={participant}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <ParticipantsFormInputs />
            {props.submitFailed && props.hasValidationErrors && (
              <div className="form__global-error-message">
                {t('shared.formError')}
              </div>
            )}
            <div className="form__buttons-container">
              <Button type="submit">{t('shared.save')}</Button>
              <BackButton muted>{t('shared.cancel')}</BackButton>
            </div>
          </form>
        )}
      </Form>
    </PageContainer>
  );
};
