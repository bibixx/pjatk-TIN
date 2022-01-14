import {
  GetParticipantsResponseDTO,
  GetTripParticipantResponseDTO,
  GetTripsResponseDTO,
  tripParticipantValidator,
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
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from 'utils/fetcher';
import { makeRequest } from 'utils/makeRequest';
import { Infer } from 'typed';
import { TripPaymentsFormInputs } from '../TripPaymentsFormInputs/TripPaymentsFormInputs';

export const TripPaymentsEditDetails = () => {
  const { id } = useParams<'id'>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: tripPaymentData } = useSWR<GetTripParticipantResponseDTO>(
    `/api/trip-payments/${id}`,
    fetcher,
  );

  const { data: participantsData } =
    useSWR<GetParticipantsResponseDTO>('/api/participants');

  const { data: tripsData } = useSWR<GetTripsResponseDTO>('/api/trips');

  const tripPayment = tripPaymentData?.tripParticipant;
  const participants = participantsData?.participants;
  const trips = tripsData?.trips;

  const onSubmit = async (values: Infer<typeof tripParticipantValidator>) => {
    try {
      await makeRequest<UpdateTripParticipantRequestDTO>(
        `/api/trip-payments/${id}`,
        'PUT',
        values,
      );

      toast.success(t('tripParticipants.toasts.editSuccess'));
      navigate('/trip-payments');
    } catch (error) {
      toast.error(t('tripParticipants.toasts.error'));
    }
  };

  if (
    tripPayment === undefined ||
    participants === undefined ||
    trips === undefined
  ) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageContainerHeader header={t('tripParticipants.details.header.edit')} />
      <Form onSubmit={onSubmit} initialValues={tripPayment}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <TripPaymentsFormInputs participants={participants} trips={trips} />
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
