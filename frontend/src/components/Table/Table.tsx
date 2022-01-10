/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { IdType, TableInstance } from 'react-table';

interface Props<Data extends object> {
  tableInstance: TableInstance<Data>;
  getUrl?: (data: Data, columnName: IdType<Data>) => string | undefined;
  getIsActionsCell?: (columnName: IdType<Data>) => boolean;
}

export const Table = <Data extends object>({
  tableInstance: {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  },
  getUrl,
  getIsActionsCell,
}: Props<Data>) => {
  return (
    <div className="table-wrapper">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="table__header"
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="table__cell table__header-cell"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="table__tbody">
          {rows.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()} className="table__row">
                {row.cells.map((cell) => {
                  const url = getUrl?.(row.original, cell.column.id);
                  const className = classNames('table__cell', {
                    'table__cell--actions': getIsActionsCell?.(cell.column.id),
                  });

                  const content =
                    url !== undefined ? (
                      <Link to={url} className="table__cell-link">
                        {cell.render('Cell')}
                      </Link>
                    ) : (
                      cell.render('Cell')
                    );

                  return (
                    <td {...cell.getCellProps([{ className }])}>{content}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
