import { Column } from 'react-table';
import { GetTripsResponseDTO } from '@s19192/shared';
import { TableActions } from 'components/TableActions/TableActions';
import { TFunction } from 'react-i18next';
import { formatPrice } from 'utils/formatPrice';

export const getTripPaymentsColumns = (
  t: TFunction<'translation', undefined>,
): ReadonlyArray<Column<GetTripsResponseDTO['trips'][number]>> => [
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
];
