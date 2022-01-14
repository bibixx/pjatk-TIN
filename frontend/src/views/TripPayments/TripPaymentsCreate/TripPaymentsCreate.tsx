import {
  GetParticipantsResponseDTO,
  GetTripsResponseDTO,
  UpdateTripParticipantRequestDTO,
} from '@s19192/shared';
import { BackButton } from 'components/BackButton/BackButton';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { PageContainerHeader } from 'components/PageContainerHeader/PageContainerHeader';
import { Form } from 'react-final-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { makeRequest } from 'utils/makeRequest';
import { TripPaymentsFormInputs } from '../TripPaymentsFormInputs/TripPaymentsFormInputs';

export const TripPaymentsCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: participantsData } =
    useSWR<GetParticipantsResponseDTO>('/api/participants');

  const { data: tripsData } = useSWR<GetTripsResponseDTO>('/api/trips');

  const participants = participantsData?.participants;
  const trips = tripsData?.trips;

  const onSubmit = async (values: UpdateTripParticipantRequestDTO) => {
    try {
      await makeRequest<UpdateTripParticipantRequestDTO>(
        `/api/trip-payments`,
        'POST',
        values,
      );

      toast.success(t('tripParticipants.toasts.addSuccess'));
      navigate('/trip-payments');
    } catch (error) {
      toast.error(t('tripParticipants.toasts.error'));
    }
  };

  if (participants === undefined || trips === undefined) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageContainerHeader header={t('tripParticipants.create.header')} />
      <Form onSubmit={onSubmit}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <TripPaymentsFormInputs participants={participants} trips={trips} />
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
