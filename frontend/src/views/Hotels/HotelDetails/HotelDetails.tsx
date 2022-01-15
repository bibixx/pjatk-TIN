import { GetHotelResponseDTO, GetTripsResponseDTO } from '@s19192/shared';
import { BackButton } from 'components/BackButton/BackButton';
import { EntityError } from 'components/EntityError/EntityError';
import { LinkButton } from 'components/LinkButton/LinkButton';
import { Loader } from 'components/Loader/Loader';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { PageContainerHeader } from 'components/PageContainerHeader/PageContainerHeader';
import { Table } from 'components/Table/Table';
import { useAuth } from 'hooks/useAuth/useAuth';
import { useMemo } from 'react';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useTable } from 'react-table';
import useSWR from 'swr';
import { getTripsColumns } from '../constants/getTripsColumns';
import { HotelsFormInputs } from '../HotelFormInputs/HotelFormInputs';

export const HotelDetails = () => {
  const { id } = useParams<'id'>();
  const { t } = useTranslation();
  const { isAdmin } = useAuth();

  const { data: hotelData, error: hotelError } = useSWR<GetHotelResponseDTO>(
    `/api/hotels/${id}`,
  );

  const { data: tripsData } = useSWR<GetTripsResponseDTO>(
    `/api/trips?idhotel=${id}`,
  );

  const hotel = hotelData?.hotel;
  const trips = tripsData?.trips ?? [];

  const columns = useMemo(() => getTripsColumns(t, isAdmin), [t, isAdmin]);

  const tableInstance = useTable({
    columns,
    data: trips,
  });

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
      <PageContainerHeader header={t('hotels.details.header.details')} />
      <Form onSubmit={() => undefined} initialValues={hotel}>
        {() => <HotelsFormInputs disabled />}
      </Form>
      <div className="form__buttons-container">
        {isAdmin && (
          <LinkButton to={`/hotels/${id}/update`} icon="edit">
            {t('shared.edit')}
          </LinkButton>
        )}
        <BackButton muted>{t('shared.back')}</BackButton>
      </div>
      <h2 className="details__subheader">{t('hotels.details.tripsHeader')}</h2>

      {trips.length === 0 && <p>{t('hotels.details.tripsEmpty')}</p>}
      {trips.length > 0 && (
        <Table
          tableInstance={tableInstance}
          getIsActionsCell={(columnId) => columnId === 'actions'}
          getUrl={({ id: tripPaymentId }, columnId) =>
            columnId === 'actions' ? undefined : `/trips/${tripPaymentId}`
          }
        />
      )}
    </PageContainer>
  );
};
