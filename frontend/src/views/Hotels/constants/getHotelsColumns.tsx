import { CellProps, Column } from 'react-table';
import { GetHotelsResponseDTO } from '@s19192/shared';
import { TableActions } from 'components/TableActions/TableActions';
import { TFunction } from 'react-i18next';
import { HotelStars } from '../HotelsList/HotelStars/HotelStars';

type Data = GetHotelsResponseDTO['hotels'][number];

const getTableActions = ({ row }: CellProps<Data>) => {
  return <TableActions pathBase={`/hotels/${row.original.id}`} />;
};

export const getHotelsColumns = (
  t: TFunction<'translation', undefined>,
  isAdmin: boolean,
): ReadonlyArray<Column<Data>> => [
  {
    Header: t('hotels.list.table.name'),
    accessor: 'name',
  },
  {
    Header: t('hotels.list.table.numberOfStars'),
    accessor: 'numberofstars',
    Cell: ({ value }) => <HotelStars numberOfStars={value} />,
  },
  ...(isAdmin
    ? [
        {
          id: 'actions',
          Header: '',
          Cell: getTableActions,
        },
      ]
    : []),
];
