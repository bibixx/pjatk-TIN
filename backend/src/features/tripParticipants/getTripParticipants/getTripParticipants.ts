import { GetTripParticipantsResponseDTO } from '@s19192/shared';
import { withJSON } from 'utils/withJSON/withJSON';
import { getAllTripParticipants } from '../tripParticipants.model';

export const getTripParticipants = withJSON<GetTripParticipantsResponseDTO>()(
  async () => {
    const tripParticipants = await getAllTripParticipants();

    return {
      tripParticipants,
    };
  },
);
