import useSWR from 'swr';

import { Table } from 'components/Table/Table';
import { useMemo } from 'react';
import { useTable } from 'react-table';
import { GetTripsResponseDTO } from '@s19192/shared';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { PageContainerHeader } from 'components/PageContainerHeader/PageContainerHeader';
import { LinkButton } from 'components/LinkButton/LinkButton';
import { Loader } from 'components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { useAuth } from 'hooks/useAuth/useAuth';
import { getTripsColumns } from '../constants/getTripsColumns';

export const TripsList = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();

  const { data } = useSWR<GetTripsResponseDTO>('/api/trips');
  const trips = data?.trips ?? [];

  const columns = useMemo(() => getTripsColumns(t, isAdmin), [isAdmin, t]);

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
          buttonText={t('trips.list.emptyState.button')}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageContainerHeader header={t('trips.list.header.text')}>
        {isAdmin && (
          <LinkButton to="./create" icon="add">
            {t('trips.list.header.button')}
          </LinkButton>
        )}
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
