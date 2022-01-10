import { DeleteParticipantResponseDTO } from '@s19192/shared';
import { db } from 'core/db';
import { deleteTripParticipantsByParticipantId } from 'features/tripParticipants/tripParticipants.model';
import { getNumericId } from 'utils/getNumericId';
import { APIError, withJSON } from 'utils/withJSON/withJSON';
import { deleteParticipantById } from '../participants.model';

export const deleteParticipant = withJSON<DeleteParticipantResponseDTO>()(
  async (_body, req) => {
    const id = getNumericId(req.params.id);

    if (id === null) {
      throw new APIError('Provided id is invalid', 422);
    }

    const deletedCount = await db.transaction(async (trx) => {
      await deleteTripParticipantsByParticipantId(id).transacting(trx);

      return deleteParticipantById(id).transacting(trx);
    });

    if (deletedCount === 0) {
      throw new APIError('Participant not found', 404);
    }

    return {};
  },
);
