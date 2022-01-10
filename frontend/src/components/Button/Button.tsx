import cn from 'classnames';

interface Props extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: string;
  muted?: boolean;
  danger?: boolean;
  type: 'button' | 'submit';
}

export const Button = ({
  children,
  icon,
  muted = false,
  danger = false,
  type = 'button',
  ...rest
}: Props) => {
  return (
    <button
      className={cn('button', {
        'button--muted': muted,
        'button--danger': danger,
      })}
      // eslint-disable-next-line react/button-has-type
      type={type}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
      {icon && <span className="material-icons">{icon}</span>}
    </button>
  );
};
