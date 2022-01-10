import { withJSON } from 'utils/withJSON/withJSON';
import {
  CreateParticipantRequestDTO,
  CreateParticipantResponseDTO,
  ParticipantTable,
  participantValidator,
} from '@s19192/shared';
import { replaceDateWithTimestamp } from 'utils/replaceDateWithString';
import { createParticipant as createParticipantModel } from '../participants.model';

export const createParticipant = withJSON<
  CreateParticipantResponseDTO,
  CreateParticipantRequestDTO
>(participantValidator)(async (participant) => {
  const [newParticipant] = await createParticipantModel(participant);

  return {
    participant: replaceDateWithTimestamp(newParticipant as ParticipantTable),
  };
});
