import { GetTripParticipantResponseDTO } from '@s19192/shared';
import { BackButton } from 'components/BackButton/BackButton';
import { LinkButton } from 'components/LinkButton/LinkButton';
import { Loader } from 'components/Loader/Loader';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { PageContainerHeader } from 'components/PageContainerHeader/PageContainerHeader';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from 'utils/fetcher';
import { ParticipantsFormInputs } from 'views/Participants/ParticipantsFormInputs/ParticipantsFormInputs';
import { TripPaymentsFormInputs } from '../TripPaymentsFormInputs/TripPaymentsFormInputs';

export const TripPaymentsDetails = () => {
  const { id } = useParams<'id'>();
  const { t } = useTranslation();

  const { data: tripPaymentData } = useSWR<GetTripParticipantResponseDTO>(
    `/api/trip-payments/${id}`,
    fetcher,
  );

  const tripPayment = tripPaymentData?.tripParticipant;

  if (tripPayment === undefined) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageContainerHeader
        header={t('tripParticipants.details.header.details')}
      />
      <Form onSubmit={() => undefined} initialValues={tripPayment}>
        {() => <TripPaymentsFormInputs disabled />}
      </Form>
      <div className="form__buttons-container">
        <LinkButton to={`/trip-payments/${id}/update`} icon="edit">
          {t('shared.edit')}
        </LinkButton>
        <BackButton muted>{t('shared.back')}</BackButton>
      </div>
      <h2 className="details__subheader">
        {t('tripParticipants.details.participantHeader')}
      </h2>
      <Form onSubmit={() => undefined} initialValues={tripPayment.participant}>
        {() => <ParticipantsFormInputs disabled />}
      </Form>
      <h2 className="details__subheader">
        {t('tripParticipants.details.tripHeader')}
      </h2>
      {/* TODO: trip data */}
      {/* <Form onSubmit={() => undefined} initialValues={tripPayment.trip}>
        {() => <TripsFormInputs disabled />}
      </Form> */}
    </PageContainer>
  );
};
