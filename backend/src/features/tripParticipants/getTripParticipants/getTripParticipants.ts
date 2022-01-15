import { GetTripParticipantsResponseDTO } from '@s19192/shared';
import { getNumericId } from 'utils/getNumericId';
import { isParticipant, withAuth } from 'utils/withAuth/withAuth';
import { withJSON } from 'utils/withJSON/withJSON';
import { getAllTripParticipants } from '../tripParticipants.model';

export const getTripParticipants = withAuth()((user) =>
  withJSON<GetTripParticipantsResponseDTO>()(async (body, req) => {
    const participantId = isParticipant(user)
      ? user.idparticipant
      : getNumericId(req.query.idparticipant) ?? undefined;

    const tripId = getNumericId(req.query.idtrip) ?? undefined;

    const tripParticipants = await getAllTripParticipants({
      participantId,
      tripId,
    });

    return {
      tripParticipants,
    };
  }),
);
