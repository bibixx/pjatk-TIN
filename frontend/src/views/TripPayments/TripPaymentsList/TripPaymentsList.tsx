import useSWR from 'swr';

import { Table } from 'components/Table/Table';
import { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { GetTripParticipantsResponseDTO } from '@s19192/shared';
import { TableActions } from 'components/TableActions/TableActions';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { PageContainerHeader } from 'components/PageContainerHeader/PageContainerHeader';
import { LinkButton } from 'components/LinkButton/LinkButton';
import { Loader } from 'components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { formatTimestamp } from 'utils/formatTimestamp';

export const TripPaymentsList = () => {
  const { t } = useTranslation();

  const { data } = useSWR<GetTripParticipantsResponseDTO>('/api/trip-payments');
  const tripParticipants = data?.tripParticipants ?? [];

  const columns = useMemo(
    (): ReadonlyArray<Column<typeof tripParticipants[number]>> => [
      {
        Header: t('tripParticipants.list.table.tripName'),
        accessor: (row) => row.trip.name,
      },
      {
        Header: t('tripParticipants.list.table.participantName'),
        accessor: (row) => row.participant.name,
      },
      {
        Header: t('tripParticipants.list.table.participantSurname'),
        accessor: (row) => row.participant.surname,
      },
      {
        Header: t('tripParticipants.list.table.dateOfPayment'),
        accessor: 'dateofpayment',
        Cell: ({ value }) =>
          formatTimestamp(value) ??
          t('tripParticipants.list.table.emptyDateOfPayment'),
      },
      {
        id: 'actions',
        Header: '',
        Cell: TableActions,
      },
    ],
    [t],
  );

  const tableInstance = useTable({
    columns,
    data: tripParticipants,
  });

  if (data === undefined) {
    return <Loader />;
  }

  if (tripParticipants.length === 0) {
    return (
      <EmptyState
        info={t('tripParticipants.list.emptyState.text')}
        buttonText={t('tripParticipants.list.emptyState.text')}
      />
    );
  }

  return (
    <>
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
    </>
  );
};
