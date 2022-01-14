import {
  GetHotelsResponseDTO,
  GetParticipantsResponseDTO,
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
import { TripsFormInputs } from '../TripsFormInputs/TripsFormInputs';

export const TripsCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: participantsData } =
    useSWR<GetParticipantsResponseDTO>('/api/participants');

  const { data: hotelsData } = useSWR<GetHotelsResponseDTO>('/api/hotels');

  const participants = participantsData?.participants;
  const hotels = hotelsData?.hotels;

  const onSubmit = async (values: UpdateTripParticipantRequestDTO) => {
    try {
      await makeRequest<UpdateTripParticipantRequestDTO>(
        `/api/trips`,
        'POST',
        values,
      );

      toast.success(t('trips.toasts.addSuccess'));
      navigate('/trips');
    } catch (error) {
      toast.error(t('trips.toasts.error'));
    }
  };

  if (participants === undefined || hotels === undefined) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageContainerHeader header={t('trips.create.header')} />
      <Form onSubmit={onSubmit}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <TripsFormInputs hotels={hotels} />
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
