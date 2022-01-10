import { Link } from 'react-router-dom';

interface Props {
  to: string;
  children: React.ReactNode;
  icon: string;
}

export const LinkButton = ({ to, children, icon }: Props) => {
  return (
    <Link to={to} className="button">
      {children}
      {icon && <span className="material-icons">{icon}</span>}
    </Link>
  );
};
