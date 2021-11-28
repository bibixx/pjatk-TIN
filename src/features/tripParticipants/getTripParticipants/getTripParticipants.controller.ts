import { withView } from 'utils/views/withView';
import { getAllTripParticipants } from '../tripParticipants.model';
import { getTripParticipantsView } from './getTripParticipants.view';

export const getTripParticipants = withView(getTripParticipantsView)(
  async () => {
    const tripParticipants = await getAllTripParticipants();

    return {
      success: true,
      data: {
        tripParticipants,
      },
    };
  },
);
