import { CreateHotelRequestDTO, ReplaceDateWithNumber } from '@s19192/shared';
import { BackButton } from 'components/BackButton/BackButton';
import { Button } from 'components/Button/Button';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { PageContainerHeader } from 'components/PageContainerHeader/PageContainerHeader';
import { Form } from 'react-final-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from 'utils/makeRequest';
import { HotelsFormInputs } from '../HotelFormInputs/HotelFormInputs';

export const HotelCreate = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = async (
    values: ReplaceDateWithNumber<CreateHotelRequestDTO>,
  ) => {
    try {
      await makeRequest(`/api/hotels`, 'POST', values);

      toast.success(t('hotels.toasts.addSuccess'));
      navigate('/hotels');
    } catch (error) {
      toast.error(t('hotels.toasts.error'));
    }
  };

  return (
    <PageContainer>
      <PageContainerHeader header={t('hotels.create.header')} />
      <Form onSubmit={onSubmit}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <HotelsFormInputs />
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
