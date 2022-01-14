import {
  GetTripParticipantsResponseDTO,
  GetTripResponseDTO,
} from '@s19192/shared';
import { DeleteView } from 'components/DeleteView/DeleteView';
import { Loader } from 'components/Loader/Loader';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { Table } from 'components/Table/Table';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useTable } from 'react-table';
import useSWR from 'swr';
import { makeRequest } from 'utils/makeRequest';
import { getTripPaymentsColumns } from '../constants/getTripPaymentsColumns';

export const TripsDelete = () => {
  const { id } = useParams<'id'>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: tripData } = useSWR<GetTripResponseDTO>(`/api/trips/${id}`);

  const { data: tripPaymentsData } = useSWR<GetTripParticipantsResponseDTO>(
    `/api/trip-payments?idtrip=${id}`,
  );

  const trip = tripData?.trip;
  const tripPayments = tripPaymentsData?.tripParticipants ?? [];

  const columns = useMemo(() => getTripPaymentsColumns(t), [t]);

  const onDelete = async () => {
    try {
      await makeRequest(`/api/trips/${id}`, 'DELETE');

      toast.success(t('trips.toasts.deleteSuccess'));
      navigate('/trips');
    } catch (error) {
      toast.error(t('trips.toasts.error'));
    }
  };

  const tableInstance = useTable({
    columns,
    data: tripPayments,
  });

  if (trip === undefined || tripPayments === undefined) {
    return (
      <PageContainer isCentered>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <DeleteView
      onDelete={onDelete}
      heading={t('trips.delete.heading')}
      subtext={t('trips.delete.subtext')}
      subject={trip.name}
      tableSubtext={t('trips.delete.tableSubtext')}
    >
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
    </DeleteView>
  );
};
