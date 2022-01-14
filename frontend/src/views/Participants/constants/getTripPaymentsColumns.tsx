import { Column, CellProps } from 'react-table';
import { GetTripParticipantsResponseDTO } from '@s19192/shared';
import { TableActions } from 'components/TableActions/TableActions';
import { formatTimestamp } from 'utils/formatTimestamp';
import { TFunction } from 'react-i18next';

type Data = GetTripParticipantsResponseDTO['tripParticipants'][number];

const getTableActions = ({ row }: CellProps<Data>) => {
  return <TableActions pathBase={`/trip-payments/${row.original.id}`} />;
};

export const getTripPaymentsColumns = (
  t: TFunction<'translation', undefined>,
): ReadonlyArray<Column<Data>> => [
  {
    Header: t('tripParticipants.list.table.tripName'),
    accessor: (row) => row.trip.name,
  },
  {
    Header: t('tripParticipants.list.table.dateOfPayment'),
    accessor: 'dateofpayment',
    Cell: ({ value }) => formatTimestamp(value) ?? t('shared.empty'),
  },
  {
    Header: t('tripParticipants.list.table.discount'),
    accessor: 'discount',
    Cell: ({ value }) => (value ? `${value}%` : t('shared.empty')),
  },
  {
    id: 'actions',
    Header: '',
    Cell: getTableActions,
  },
];
