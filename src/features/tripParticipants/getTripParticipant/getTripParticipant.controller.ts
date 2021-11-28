import { Request } from 'express';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';
import { getTripParticipantById } from '../tripParticipants.model';
import { formatTripParticipant } from '../tripParticipants.utils';
import { getTripParticipantView } from './getTripParticipant.view';

export const getTripParticipant = withView(getTripParticipantView)(
  async (req: Request) => {
    const id = getNumericId(req.params.id);

    if (id === null) {
      return {
        success: false,
        error: 'INVALID_ID',
      };
    }

    const tripParticipant = await getTripParticipantById(id);

    if (tripParticipant === undefined) {
      return {
        success: false,
        error: 'NOT_FOUND',
      };
    }

    return {
      success: true,
      data: {
        tripParticipant: formatTripParticipant(tripParticipant),
      },
    };
  },
);
