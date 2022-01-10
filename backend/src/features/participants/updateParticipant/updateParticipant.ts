import {
  ParticipantTable,
  participantValidator,
  UpdateParticipantRequestDTO,
  UpdateParticipantResponseDTO,
} from '@s19192/shared';
import { getNumericId } from 'utils/getNumericId';
import { replaceDateWithTimestamp } from 'utils/replaceDateWithString';
import { APIError, withJSON } from 'utils/withJSON/withJSON';
import {
  getParticipantById,
  updateParticipant as updateParticipantModel,
} from '../participants.model';

export const updateParticipant = withJSON<
  UpdateParticipantResponseDTO,
  UpdateParticipantRequestDTO
>(participantValidator)(async (participant, req) => {
  const id = getNumericId(req.params.id);

  if (id === null) {
    throw new APIError('Provided id is invalid', 422);
  }

  const oldParticipant = await getParticipantById(id);

  if (oldParticipant === undefined) {
    throw new APIError('Participant not found', 404);
  }

  const [newParticipant] = await updateParticipantModel(id, participant);

  return {
    participant: replaceDateWithTimestamp(newParticipant as ParticipantTable),
  };
});
