import { GetHotelResponseDTO, GetTripsResponseDTO } from '@s19192/shared';
import { DeleteView } from 'components/DeleteView/DeleteView';
import { EntityError } from 'components/EntityError/EntityError';
import { Loader } from 'components/Loader/Loader';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { Table } from 'components/Table/Table';
import { useAuth } from 'hooks/useAuth/useAuth';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useTable } from 'react-table';
import useSWR from 'swr';
import { makeRequest } from 'utils/makeRequest';
import { getTripsColumns } from '../constants/getTripsColumns';

export const HotelDelete = () => {
  const { id } = useParams<'id'>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const { data: hotelData, error: hotelError } = useSWR<GetHotelResponseDTO>(
    `/api/hotels/${id}`,
  );

  const { data: tripsData } = useSWR<GetTripsResponseDTO>(
    `/api/trips?idhotel=${id}`,
  );

  const hotel = hotelData?.hotel;
  const trips = tripsData?.trips ?? [];

  const columns = useMemo(() => getTripsColumns(t, isAdmin), [isAdmin, t]);

  const tableInstance = useTable({
    columns,
    data: trips,
  });

  const onDelete = async () => {
    try {
      await makeRequest(`/api/hotels/${id}`, 'DELETE');

      toast.success(t('hotels.toasts.deleteSuccess'));
      navigate('/participants');
    } catch (error) {
      toast.error(t('participants.toasts.error'));
    }
  };

  if (hotelError) {
    return <EntityError errors={[hotelError]} page="hotels" />;
  }

  if (hotel === undefined) {
    return (
      <PageContainer isCentered>
        <Loader />
      </PageContainer>
    );
  }

  if (trips.length > 0) {
    return (
      <DeleteView
        subject={hotel.name}
        heading={t('hotels.delete.cantDelete.heading')}
        subtext={t('hotels.delete.cantDelete.subtext')}
      >
        <Table
          tableInstance={tableInstance}
          getIsActionsCell={(columnId) => columnId === 'actions'}
          getUrl={({ id: tripPaymentId }, columnId) =>
            columnId === 'actions' ? undefined : `/trips/${tripPaymentId}`
          }
        />
      </DeleteView>
    );
  }

  return (
    <DeleteView
      subject={hotel.name}
      heading={t('hotels.delete.heading')}
      subtext={t('hotels.delete.subtext')}
      onDelete={onDelete}
    />
  );
};
