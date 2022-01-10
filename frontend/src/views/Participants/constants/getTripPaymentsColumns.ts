import { Column } from 'react-table';
import { GetTripParticipantsResponseDTO } from '@s19192/shared';
import { TableActions } from 'components/TableActions/TableActions';
import { formatTimestamp } from 'utils/formatTimestamp';
import { TFunction } from 'react-i18next';

export const getTripPaymentsColumns = (
  t: TFunction<'translation', undefined>,
): ReadonlyArray<
  Column<GetTripParticipantsResponseDTO['tripParticipants'][number]>
> => [
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
    Cell: TableActions,
  },
];
