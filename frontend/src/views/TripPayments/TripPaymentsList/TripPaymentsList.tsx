import useSWR from 'swr';

import { Table } from 'components/Table/Table';
import { useMemo } from 'react';
import { useTable } from 'react-table';
import { GetTripParticipantsResponseDTO } from '@s19192/shared';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { PageContainerHeader } from 'components/PageContainerHeader/PageContainerHeader';
import { LinkButton } from 'components/LinkButton/LinkButton';
import { Loader } from 'components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { getTripPaymentsColumns } from '../constants/getTripPaymentsColumns';

export const TripPaymentsList = () => {
  const { t } = useTranslation();

  const { data } = useSWR<GetTripParticipantsResponseDTO>('/api/trip-payments');
  const tripParticipants = data?.tripParticipants ?? [];

  const columns = useMemo(() => getTripPaymentsColumns(t), [t]);

  const tableInstance = useTable({
    columns,
    data: tripParticipants,
  });

  if (data === undefined) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  if (tripParticipants.length === 0) {
    return (
      <PageContainer>
        <EmptyState
          info={t('tripParticipants.list.emptyState.text')}
          buttonText={t('tripParticipants.list.emptyState.text')}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageContainerHeader header={t('tripParticipants.list.header.text')}>
        <LinkButton to="./create" icon="add">
          {t('tripParticipants.list.header.button')}
        </LinkButton>
      </PageContainerHeader>
      <Table
        tableInstance={tableInstance}
        getIsActionsCell={(columnId) => columnId === 'actions'}
        getUrl={({ id }, columnId) =>
          columnId === 'actions' ? undefined : String(id)
        }
      />
    </PageContainer>
  );
};
