import { Link } from 'react-router-dom';
import { CellProps } from 'react-table';

interface ActionableData {
  id: string;
}

export function TableActions<T extends ActionableData>({ row }: CellProps<T>) {
  return (
    <div className="table__actions-container">
      <Link to={`./${row.original.id}/update/`} className="action-button">
        <span className="material-icons">edit</span>
      </Link>
      <Link
        to={`./${row.original.id}/delete/`}
        className="action-button action-button--danger"
      >
        <span className="material-icons">delete</span>
      </Link>
    </div>
  );
}
