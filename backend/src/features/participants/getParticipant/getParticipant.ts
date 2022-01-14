import { GetParticipantResponseDTO } from '@s19192/shared';
import { getNumericId } from 'utils/getNumericId';
import { replaceDateWithTimestamp } from 'utils/replaceDateWithString';
import { APIError, withJSON } from 'utils/withJSON/withJSON';
import { getParticipantById } from '../participants.model';

export const getParticipant = withJSON<GetParticipantResponseDTO>()(
  async (_body, req) => {
    const id = getNumericId(req.params.id);

    if (id === null) {
      throw new APIError('Participant not found', 404);
    }

    const participant = await getParticipantById(id);

    if (participant === undefined) {
      throw new APIError('Participant not found', 404);
    }

    return {
      participant: replaceDateWithTimestamp(participant),
    };
  },
);
