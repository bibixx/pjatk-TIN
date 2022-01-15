import {
  GetParticipantResponseDTO,
  GetTripParticipantsResponseDTO,
} from '@s19192/shared';
import { DeleteView } from 'components/DeleteView/DeleteView';
import { EntityError } from 'components/EntityError/EntityError';
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

export const ParticipantDelete = () => {
  const { id } = useParams<'id'>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: participantData, error: participantError } =
    useSWR<GetParticipantResponseDTO>(`/api/participants/${id}`);

  const { data: tripPaymentsData } = useSWR<GetTripParticipantsResponseDTO>(
    `/api/trip-payments?idparticipant=${id}`,
  );

  const participant = participantData?.participant;
  const tripPayments = tripPaymentsData?.tripParticipants ?? [];

  const columns = useMemo(() => getTripPaymentsColumns(t), [t]);

  const onDelete = async () => {
    try {
      await makeRequest(`/api/participants/${id}`, 'DELETE');

      toast.success(t('participants.toasts.deleteSuccess'));
      navigate('/participants');
    } catch (error) {
      toast.error(t('participants.toasts.error'));
    }
  };

  const tableInstance = useTable({
    columns,
    data: tripPayments,
  });

  if (participantError) {
    return <EntityError errors={[participantError]} page="participants" />;
  }

  if (participant === undefined || tripPayments === undefined) {
    return (
      <PageContainer isCentered>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <DeleteView
      onDelete={onDelete}
      heading={t('participants.delete.heading')}
      subtext={t('participants.delete.subtext')}
      subject={`${participant.name} ${participant.surname}`}
      tableSubtext={t('participants.delete.tableSubtext')}
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
