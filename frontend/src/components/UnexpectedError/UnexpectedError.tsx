import { PageContainer } from 'components/PageContainer/PageContainer';
import { useTranslation } from 'react-i18next';

export const UnexpectedError = () => {
  const { t } = useTranslation();
  return (
    <PageContainer isCentered>
      <header className="content-card__header-container content-card__header-container--error">
        <h1 className="content-card__heading">{t(`shared.unexpectedError`)}</h1>
      </header>
    </PageContainer>
  );
};
