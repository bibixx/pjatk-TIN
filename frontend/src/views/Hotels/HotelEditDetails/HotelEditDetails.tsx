import {
  GetHotelResponseDTO,
  ReplaceDateWithNumber,
  UpdateHotelRequestDTO,
} from '@s19192/shared';
import { BackButton } from 'components/BackButton/BackButton';
import { Button } from 'components/Button/Button';
import { EntityError } from 'components/EntityError/EntityError';
import { Loader } from 'components/Loader/Loader';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { PageContainerHeader } from 'components/PageContainerHeader/PageContainerHeader';
import { Form } from 'react-final-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { makeRequest } from 'utils/makeRequest';
import { HotelsFormInputs } from '../HotelFormInputs/HotelFormInputs';

export const HotelEditDetails = () => {
  const { id } = useParams<'id'>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: hotelData, error: hotelError } = useSWR<GetHotelResponseDTO>(
    `/api/hotels/${id}`,
  );

  const onSubmit = async (
    values: ReplaceDateWithNumber<UpdateHotelRequestDTO>,
  ) => {
    try {
      await makeRequest(`/api/hotels/${id}`, 'PUT', values);

      toast.success(t('hotels.toasts.editSuccess'));
      navigate('/hotels');
    } catch (error) {
      toast.error(t('hotels.toasts.error'));
    }
  };

  const hotel = hotelData?.hotel;

  if (hotelError) {
    return <EntityError errors={[hotelError]} page="hotels" />;
  }

  if (hotel === undefined) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageContainerHeader header={t('hotels.details.header.edit')} />
      <Form onSubmit={onSubmit} initialValues={hotel}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <HotelsFormInputs />
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
