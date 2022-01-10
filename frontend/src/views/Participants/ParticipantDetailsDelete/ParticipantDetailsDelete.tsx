import {
  GetParticipantResponseDTO,
  GetTripParticipantsResponseDTO,
} from '@s19192/shared';
import { BackButton } from 'components/BackButton/BackButton';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { Table } from 'components/Table/Table';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useTable } from 'react-table';
import useSWR from 'swr';
import { fetcher } from 'utils/fetcher';
import { makeRequest } from 'utils/makeRequest';
import { getTripPaymentsColumns } from '../constants/getTripPaymentsColumns';

export const ParticipantDelete = () => {
  const { id } = useParams<'id'>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: participantData } = useSWR<GetParticipantResponseDTO>(
    `/api/participants/${id}`,
    fetcher,
  );

  const { data: tripPaymentsData } = useSWR<GetTripParticipantsResponseDTO>(
    `/api/trip-payments?idparticipant=${id}`,
    fetcher,
  );

  const participant = participantData?.participant;
  const tripPayments = tripPaymentsData?.tripParticipants ?? [];

  const columns = useMemo(() => getTripPaymentsColumns(t), [t]);

  const onDelete = async () => {
    try {
      await makeRequest(`/api/participants/${id}`, 'DELETE');

      toast.success(t('participants.toasts.addSuccess'));
      navigate('/participants');
    } catch (error) {
      toast.error(t('participants.toasts.error'));
    }
  };

  const tableInstance = useTable({
    columns,
    data: tripPayments,
  });

  if (participant === undefined || tripPayments === undefined) {
    return (
      <PageContainer isDeleteScreen>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <PageContainer isDeleteScreen>
      <h1 className="delete-confirmation__heading">
        Czy na pewno chcesz usunąć tego uczestnika?
      </h1>
      <p className="delete-confirmation__subject">
        {participant.name} {participant.surname}
      </p>
      <p className="delete-confirmation__subtext">
        Zostanie on usunięty natychmiastowo. Akcja ta jest nieodwracalna.
      </p>

      {tripPayments.length > 0 && (
        <div className="delete-confirmation__table">
          <p className="delete-confirmation__table__subtext">
            Następujące Płatności za Wycieczki również zostaną usunięte
          </p>
          <Table
            tableInstance={tableInstance}
            getIsActionsCell={(columnId) => columnId === 'actions'}
            getUrl={({ id: tripPaymentId }, columnId) =>
              columnId === 'actions'
                ? undefined
                : `/trip-payments/${tripPaymentId}`
            }
          />
        </div>
      )}

      <div className="delete-confirmation__buttons">
        <BackButton muted>{t('shared.cancel')}</BackButton>
        <Button icon="delete" type="button" danger onClick={onDelete}>
          {t('shared.delete')}
        </Button>
      </div>
    </PageContainer>
  );
};
