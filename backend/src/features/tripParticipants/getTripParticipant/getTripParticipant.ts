import { GetTripParticipantResponseDTO } from '@s19192/shared';
import { getNumericId } from 'utils/getNumericId';
import { isParticipant, withAuth } from 'utils/withAuth/withAuth';
import { APIError, withJSON } from 'utils/withJSON/withJSON';
import { getTripParticipantById } from '../tripParticipants.model';

export const getTripParticipant = withAuth()((user) =>
  withJSON<GetTripParticipantResponseDTO>()(async (_body, req) => {
    const id = getNumericId(req.params.id);

    if (id === null) {
      throw new APIError('TripParticipant not found', 404);
    }

    const currentUserId = isParticipant(user) ? user.idparticipant : null;
    const tripParticipant = await getTripParticipantById(id, currentUserId);

    if (tripParticipant === undefined) {
      throw new APIError('TripParticipant not found', 404);
    }

    return {
      tripParticipant,
    };
  }),
);
