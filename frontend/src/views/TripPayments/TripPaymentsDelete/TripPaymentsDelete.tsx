import { GetTripParticipantResponseDTO } from '@s19192/shared';
import { DeleteView } from 'components/DeleteView/DeleteView';
import { EntityError } from 'components/EntityError/EntityError';
import { Loader } from 'components/Loader/Loader';
import { PageContainer } from 'components/PageContainer/PageContainer';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { makeRequest } from 'utils/makeRequest';

export const TripPaymentsDelete = () => {
  const { id } = useParams<'id'>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: tripPaymentData, error: tripPaymentError } =
    useSWR<GetTripParticipantResponseDTO>(`/api/trip-payments/${id}`);

  const tripPayment = tripPaymentData?.tripParticipant;

  const onDelete = async () => {
    try {
      await makeRequest(`/api/trip-payments/${id}`, 'DELETE');

      toast.success(t('tripParticipants.toasts.deleteSuccess'));
      navigate('/trip-payments');
    } catch (error) {
      toast.error(t('tripParticipants.toasts.error'));
    }
  };

  if (tripPaymentError) {
    return <EntityError errors={[tripPaymentError]} page="tripParticipants" />;
  }

  if (tripPayment === undefined) {
    return (
      <PageContainer isCentered>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <DeleteView
      onDelete={onDelete}
      heading={t('tripParticipants.delete.heading')}
      subtext={t('tripParticipants.delete.subtext')}
      subject={t('tripParticipants.delete.subject', {
        destination: tripPayment.trip.name,
        by: `${tripPayment.participant.name} ${tripPayment.participant.surname}`,
      })}
    />
  );
};
