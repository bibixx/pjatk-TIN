import useSWR from 'swr';

import { Table } from 'components/Table/Table';
import { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { GetParticipantsResponseDTO } from '@s19192/shared';
import { TableActions } from 'components/TableActions/TableActions';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { PageContainerHeader } from 'components/PageContainerHeader/PageContainerHeader';
import { LinkButton } from 'components/LinkButton/LinkButton';
import { Loader } from 'components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { PageContainer } from 'components/PageContainer/PageContainer';

export const ParticipantsList = () => {
  const { t } = useTranslation();

  const { data } = useSWR<GetParticipantsResponseDTO>('/api/participants');
  const participants = data?.participants ?? [];

  const columns = useMemo(
    (): ReadonlyArray<Column<typeof participants[number]>> => [
      {
        Header: t('participants.list.table.name'),
        accessor: 'name',
      },
      {
        Header: t('participants.list.table.surname'),
        accessor: 'surname',
      },
      {
        Header: t('participants.list.table.email'),
        accessor: 'email',
      },
      {
        id: 'actions',
        Header: '',
        Cell: TableActions,
      },
    ],
    [t],
  );

  const tableInstance = useTable({ columns, data: participants });

  if (data === undefined) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  if (participants.length === 0) {
    return (
      <PageContainer>
        <EmptyState
          info={t('participants.list.emptyState.text')}
          buttonText={t('participants.list.emptyState.text')}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageContainerHeader header={t('participants.list.header.text')}>
        <LinkButton to="./create" icon="add">
          {t('participants.list.header.button')}
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
