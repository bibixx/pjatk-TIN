import { BackButton } from 'components/BackButton/BackButton';
import { Button } from 'components/Button/Button';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { useTranslation } from 'react-i18next';

interface Props {
  heading?: React.ReactNode;
  subject?: React.ReactNode;
  subtext?: React.ReactNode;
  tableSubtext?: React.ReactNode;
  children?: React.ReactNode;
  onDelete?: () => void;
}

export const DeleteView = ({
  heading,
  subject,
  subtext,
  tableSubtext,
  children,
  onDelete,
}: Props) => {
  const { t } = useTranslation();

  return (
    <PageContainer isCentered>
      {heading && <h1 className="delete-confirmation__heading">{heading}</h1>}
      {subject && <p className="delete-confirmation__subject">{subject}</p>}
      {subtext && <p className="delete-confirmation__subtext">{subtext}</p>}

      {children && (
        <div className="delete-confirmation__table">
          {tableSubtext && (
            <p className="delete-confirmation__table__subtext">
              {tableSubtext}
            </p>
          )}
          {children}
        </div>
      )}

      <div className="delete-confirmation__buttons">
        {!onDelete && <BackButton muted>{t('shared.back')}</BackButton>}
        {onDelete && (
          <>
            <BackButton muted>{t('shared.cancel')}</BackButton>
            <Button icon="delete" type="button" danger onClick={onDelete}>
              {t('shared.delete')}
            </Button>
          </>
        )}
      </div>
    </PageContainer>
  );
};
