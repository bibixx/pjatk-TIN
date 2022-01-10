import { GetParticipantsResponseDTO } from '@s19192/shared';
import { Loader } from 'components/Loader/Loader';
import { PageContainerHeader } from 'components/PageContainerHeader/PageContainerHeader';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from 'utils/fetcher';

export const ParticipantDetails = () => {
  const { id } = useParams<'id'>();
  const { t } = useTranslation();

  const { data: participantData } = useSWR<GetParticipantsResponseDTO>(
    `/api/participants/${id}`,
    fetcher,
  );

  if (participantData === undefined) {
    return <Loader />;
  }

  return (
    <>
      <PageContainerHeader header={t('participants.details.header.text')} />
      <pre>{JSON.stringify(participantData, null, 2)}</pre>
    </>
  );
};
