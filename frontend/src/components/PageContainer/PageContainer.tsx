import classNames from 'classnames';

interface Props {
  children: React.ReactNode;
  isCentered?: boolean;
}

export const PageContainer = ({ children, isCentered = false }: Props) => {
  return (
    <div
      className={classNames('content-wrapper', {
        'content-wrapper--delete-confirmation': isCentered,
      })}
    >
      <main
        className={classNames('content-card', {
          'delete-confirmation': isCentered,
        })}
      >
        {children}
      </main>
    </div>
  );
};
