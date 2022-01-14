import {
  GetParticipantResponseDTO,
  GetTripParticipantsResponseDTO,
} from '@s19192/shared';
import { BackButton } from 'components/BackButton/BackButton';
import { LinkButton } from 'components/LinkButton/LinkButton';
import { Loader } from 'components/Loader/Loader';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { PageContainerHeader } from 'components/PageContainerHeader/PageContainerHeader';
import { Table } from 'components/Table/Table';
import { useMemo } from 'react';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useTable } from 'react-table';
import useSWR from 'swr';
import { fetcher } from 'utils/fetcher';
import { getTripPaymentsColumns } from '../constants/getTripPaymentsColumns';
import { ParticipantsFormInputs } from '../ParticipantsFormInputs/ParticipantsFormInputs';

export const ParticipantDetails = () => {
  const { id } = useParams<'id'>();
  const { t } = useTranslation();

  const { data: participantData } = useSWR<GetParticipantResponseDTO>(
    `/api/participants/${id}`,
    fetcher,
  );

  const { data: tripPaymentsData } = useSWR<GetTripParticipantsResponseDTO>(
    `/api/trip-payments?idparticipant=${id}`,
    fetcher,
  );

  const participant = participantData?.participant;
  const tripPayments = tripPaymentsData?.tripParticipants ?? [];

  const columns = useMemo(() => getTripPaymentsColumns(t), [t]);

  const tableInstance = useTable({
    columns,
    data: tripPayments,
  });

  if (participant === undefined || tripPayments === undefined) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageContainerHeader header={t('participants.details.header.details')} />
      <Form onSubmit={() => undefined} initialValues={participant}>
        {() => <ParticipantsFormInputs disabled />}
      </Form>
      <div className="form__buttons-container">
        <LinkButton to={`/participants/${id}/update`} icon="edit">
          {t('shared.edit')}
        </LinkButton>
        <BackButton muted>{t('shared.back')}</BackButton>
      </div>
      <h2 className="details__subheader">
        {t('participants.details.tripParticipantsHeader')}
      </h2>

      {tripPayments.length === 0 && (
        <p>{t('participants.details.tripParticipantsEmpty')}</p>
      )}
      {tripPayments.length > 0 && (
        <Table
          tableInstance={tableInstance}
          getIsActionsCell={(columnId) => columnId === 'actions'}
          getUrl={({ id: tripPaymentId }, columnId) =>
            columnId === 'actions'
              ? undefined
              : `/trip-payments/${tripPaymentId}`
          }
        />
      )}
    </PageContainer>
  );
};
