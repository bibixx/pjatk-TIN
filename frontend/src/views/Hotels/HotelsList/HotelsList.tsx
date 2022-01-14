import useSWR from 'swr';

import { Table } from 'components/Table/Table';
import { useMemo } from 'react';
import { useTable } from 'react-table';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { PageContainerHeader } from 'components/PageContainerHeader/PageContainerHeader';
import { LinkButton } from 'components/LinkButton/LinkButton';
import { Loader } from 'components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { GetHotelsResponseDTO } from '@s19192/shared';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { getHotelsColumns } from '../constants/getHotelsColumns';

export const HotelsList = () => {
  const { t } = useTranslation();

  const { data } = useSWR<GetHotelsResponseDTO>('/api/hotels');
  const hotels = data?.hotels ?? [];

  const columns = useMemo(() => getHotelsColumns(t), [t]);

  const tableInstance = useTable({
    columns,
    data: hotels,
  });

  if (data === undefined) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  if (hotels.length === 0) {
    return (
      <PageContainer>
        <EmptyState
          info={t('hotels.list.emptyState.text')}
          buttonText={t('hotels.list.emptyState.text')}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageContainerHeader header={t('hotels.list.header.text')}>
        <LinkButton to="./create" icon="add">
          {t('hotels.list.header.button')}
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
