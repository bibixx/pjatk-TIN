import { Link } from 'react-router-dom';

interface Props {
  pathBase: string;
}

export function TableActions({ pathBase }: Props) {
  return (
    <div className="table__actions-container">
      <Link to={`${pathBase}/update/`} className="action-button">
        <span className="material-icons">edit</span>
      </Link>
      <Link
        to={`${pathBase}/delete/`}
        className="action-button action-button--danger"
      >
        <span className="material-icons">delete</span>
      </Link>
    </div>
  );
}
