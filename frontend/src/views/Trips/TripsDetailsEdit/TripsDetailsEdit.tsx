import {
  GetHotelsResponseDTO,
  GetParticipantsResponseDTO,
  GetTripResponseDTO,
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
import { makeRequest } from 'utils/makeRequest';
import { TripsFormInputs } from '../TripsFormInputs/TripsFormInputs';

export const TripsDetailsEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<'id'>();
  const { t } = useTranslation();

  const { data: tripData } = useSWR<GetTripResponseDTO>(`/api/trips/${id}`);

  const { data: participantsData } =
    useSWR<GetParticipantsResponseDTO>('/api/participants');

  const { data: hotelsData } = useSWR<GetHotelsResponseDTO>('/api/hotels');

  const participants = participantsData?.participants;
  const hotels = hotelsData?.hotels;
  const trip = tripData?.trip;

  const onSubmit = async (values: UpdateTripParticipantRequestDTO) => {
    try {
      await makeRequest<UpdateTripParticipantRequestDTO>(
        `/api/trips/${id}`,
        'PUT',
        values,
      );

      toast.success(t('trips.toasts.editSuccess'));
      navigate('/trips');
    } catch (error) {
      toast.error(t('trips.toasts.error'));
    }
  };

  if (
    trip === undefined ||
    participants === undefined ||
    hotels === undefined
  ) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageContainerHeader header={t('trips.details.header.edit')} />
      <Form onSubmit={onSubmit} initialValues={trip}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <TripsFormInputs hotels={hotels} />
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
