import {
  ParticipantTable,
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
import { participantValidator } from '../participants.validators';

export const updateParticipant = withJSON<
  UpdateParticipantResponseDTO,
  UpdateParticipantRequestDTO
>(participantValidator)(async (participant, req) => {
  const id = getNumericId(req.params.id);

  if (id === null) {
    throw new APIError('Provided id is invalid', 422);
  }

  const { body } = req;

  const validationResult = participantValidator(body);
  const oldParticipant = await getParticipantById(id);

  if (oldParticipant === undefined) {
    throw new APIError('Participant not found', 404);
  }

  if (!validationResult.success) {
    throw new APIError('Invalid body', 422, validationResult.errors);
  }

  const [newParticipant] = await updateParticipantModel(id, participant);

  return {
    participant: replaceDateWithTimestamp(newParticipant as ParticipantTable),
  };
});
