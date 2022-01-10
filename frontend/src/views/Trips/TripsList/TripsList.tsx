import useSWR from 'swr';

import { Table } from 'components/Table/Table';
import { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { GetTripsResponseDTO } from '@s19192/shared';
import { TableActions } from 'components/TableActions/TableActions';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { PageContainerHeader } from 'components/PageContainerHeader/PageContainerHeader';
import { LinkButton } from 'components/LinkButton/LinkButton';
import { Loader } from 'components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { formatPrice } from 'utils/formatPrice';
import { PageContainer } from 'components/PageContainer/PageContainer';

export const TripsList = () => {
  const { t } = useTranslation();

  const { data } = useSWR<GetTripsResponseDTO>('/api/trips');
  const trips = data?.trips ?? [];

  const columns = useMemo(
    (): ReadonlyArray<Column<typeof trips[number]>> => [
      {
        Header: t('trips.list.table.name'),
        accessor: 'name',
      },
      {
        Header: t('trips.list.table.price'),
        accessor: 'price',
        Cell: ({ value }) => formatPrice(value),
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
    data: trips,
  });

  if (data === undefined) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  if (trips.length === 0) {
    return (
      <PageContainer>
        <EmptyState
          info={t('trips.list.emptyState.text')}
          buttonText={t('trips.list.emptyState.text')}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageContainerHeader header={t('trips.list.header.text')}>
        <LinkButton to="./create" icon="add">
          {t('trips.list.header.button')}
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
