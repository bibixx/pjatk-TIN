import { GetTripParticipantsResponseDTO } from '@s19192/shared';
import { getNumericId } from 'utils/getNumericId';
import { withJSON } from 'utils/withJSON/withJSON';
import { getAllTripParticipants } from '../tripParticipants.model';

export const getTripParticipants = withJSON<GetTripParticipantsResponseDTO>()(
  async (body, req) => {
    const participantId = getNumericId(req.query.idparticipant) ?? undefined;
    const tripId = getNumericId(req.query.idtrip) ?? undefined;

    const tripParticipants = await getAllTripParticipants({
      participantId,
      tripId,
    });

    return {
      tripParticipants,
    };
  },
);
