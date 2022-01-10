import classNames from 'classnames';

interface Props {
  children: React.ReactNode;
  isDeleteScreen?: boolean;
}

export const PageContainer = ({ children, isDeleteScreen = false }: Props) => {
  return (
    <div
      className={classNames('content-wrapper', {
        'content-wrapper--delete-confirmation': isDeleteScreen,
      })}
    >
      <main
        className={classNames('content-card', {
          'delete-confirmation': isDeleteScreen,
        })}
      >
        {children}
      </main>
    </div>
  );
};
