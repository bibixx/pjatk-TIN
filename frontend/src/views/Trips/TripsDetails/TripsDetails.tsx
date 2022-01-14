import {
  GetHotelResponseDTO,
  GetTripParticipantsResponseDTO,
  GetTripResponseDTO,
} from '@s19192/shared';
import { BackButton } from 'components/BackButton/BackButton';
import { LinkButton } from 'components/LinkButton/LinkButton';
import { Loader } from 'components/Loader/Loader';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { PageContainerHeader } from 'components/PageContainerHeader/PageContainerHeader';
import { Table } from 'components/Table/Table';
import { useMemo } from 'react';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useTable } from 'react-table';
import useSWR from 'swr';
import { HotelsFormInputs } from 'views/Hotels/HotelFormInputs/HotelFormInputs';
import { getTripPaymentsColumns } from '../constants/getTripPaymentsColumns';
import { TripsFormInputs } from '../TripsFormInputs/TripsFormInputs';

export const TripsDetails = () => {
  const { id } = useParams<'id'>();
  const { t } = useTranslation();

  const { data: tripData } = useSWR<GetTripResponseDTO>(`/api/trips/${id}`);

  const { data: hotelData } = useSWR<GetHotelResponseDTO>(
    tripData ? `/api/hotels/${tripData.trip.idhotel}` : null,
  );

  const { data: tripPaymentsData } = useSWR<GetTripParticipantsResponseDTO>(
    `/api/trip-payments?idtrip=${id}`,
  );

  const tripPayments = tripPaymentsData?.tripParticipants ?? [];
  const trip = tripData?.trip;
  const hotel = hotelData?.hotel;

  const columns = useMemo(() => getTripPaymentsColumns(t), [t]);

  const tableInstance = useTable({
    columns,
    data: tripPayments,
  });

  if (trip === undefined || hotel === undefined) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageContainerHeader header={t('trips.details.header.details')} />
      <Form onSubmit={() => undefined} initialValues={trip}>
        {() => <TripsFormInputs disabled />}
      </Form>
      <div className="form__buttons-container">
        <LinkButton to={`/trips/${id}/update`} icon="edit">
          {t('shared.edit')}
        </LinkButton>
        <BackButton muted>{t('shared.back')}</BackButton>
      </div>
      <h2 className="details__subheader">{t('trips.details.hotelHeader')}</h2>
      <Form onSubmit={() => undefined} initialValues={hotel}>
        {() => <HotelsFormInputs disabled />}
      </Form>
      <h2 className="details__subheader">
        {t('trips.details.tripParticipantsHeader')}
      </h2>
      {tripPayments.length === 0 && (
        <p>{t('trips.details.tripParticipantsEmpty')}</p>
      )}
      {tripPayments.length > 0 && (
        <Table
          tableInstance={tableInstance}
          getIsActionsCell={(columnId) => columnId === 'actions'}
          getUrl={({ id: tripPaymentId }, columnId) =>
            columnId === 'actions'
              ? undefined
              : `/trip-payments/${tripPaymentId}`
          }
        />
      )}
    </PageContainer>
  );
};
