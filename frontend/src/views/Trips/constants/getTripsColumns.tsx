import { CellProps, Column } from 'react-table';
import { GetTripsResponseDTO } from '@s19192/shared';
import { TableActions } from 'components/TableActions/TableActions';
import { TFunction } from 'react-i18next';
import { formatPrice } from 'utils/formatPrice';

type Data = GetTripsResponseDTO['trips'][number];

const getTableActions = ({ row }: CellProps<Data>) => {
  return <TableActions pathBase={`/trips/${row.original.id}`} />;
};

export const getTripsColumns = (
  t: TFunction<'translation', undefined>,
): ReadonlyArray<Column<Data>> => [
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
    Cell: getTableActions,
  },
];
