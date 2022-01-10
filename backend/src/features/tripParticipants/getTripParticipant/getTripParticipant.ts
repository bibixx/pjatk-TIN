import { GetTripParticipantResponseDTO } from '@s19192/shared';
import { getNumericId } from 'utils/getNumericId';
import { APIError, withJSON } from 'utils/withJSON/withJSON';
import { getTripParticipantById } from '../tripParticipants.model';

export const getTripParticipant = withJSON<GetTripParticipantResponseDTO>()(
  async (_body, req) => {
    const id = getNumericId(req.params.id);

    if (id === null) {
      throw new APIError('Provided id is invalid', 422);
    }

    const tripParticipant = await getTripParticipantById(id);

    if (tripParticipant === undefined) {
      throw new APIError('TripParticipant not found', 404);
    }

    return {
      tripParticipant,
    };
  },
);
