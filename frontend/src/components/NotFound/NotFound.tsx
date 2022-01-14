import { PageContainer } from 'components/PageContainer/PageContainer';
import { useTranslation } from 'react-i18next';

interface Props {
  page: 'participants' | 'tripParticipants' | 'trips' | 'hotels';
}

export const NotFound = ({ page }: Props) => {
  const { t } = useTranslation();
  return (
    <PageContainer isCentered>
      <header className="content-card__header-container content-card__header-container--error">
        <h1 className="content-card__heading">{t(`${page}.notFound`)}</h1>
      </header>
    </PageContainer>
  );
};
