import { Column, CellProps } from 'react-table';
import { GetParticipantsResponseDTO } from '@s19192/shared';
import { TableActions } from 'components/TableActions/TableActions';
import { TFunction } from 'react-i18next';

type Data = GetParticipantsResponseDTO['participants'][number];

const getTableActions = ({ row }: CellProps<Data>) => {
  return <TableActions pathBase={`/participants/${row.original.id}`} />;
};

export const getParticipantsColumns = (
  t: TFunction<'translation', undefined>,
): ReadonlyArray<Column<Data>> => [
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
    Cell: getTableActions,
  },
];
