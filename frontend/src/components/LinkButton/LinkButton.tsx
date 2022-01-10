import cn from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  to: string;
  children: React.ReactNode;
  icon?: string;
  muted?: boolean;
  danger?: boolean;
};

export const LinkButton = ({
  to,
  children,
  icon,
  muted = false,
  danger = false,
}: Props) => {
  return (
    <Link
      to={to}
      className={cn('button', {
        'button--muted': muted,
        'button--danger': danger,
      })}
    >
      {children}
      {icon && <span className="material-icons">{icon}</span>}
    </Link>
  );
};
