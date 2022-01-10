import { GetParticipantsResponseDTO } from '@s19192/shared';
import { replaceDateWithTimestamp } from 'utils/replaceDateWithString';
import { withJSON } from 'utils/withJSON/withJSON';
import { getAllParticipants } from '../participants.model';

export const getParticipants = withJSON<GetParticipantsResponseDTO>()(
  async () => {
    const participants = (await getAllParticipants()).map(
      replaceDateWithTimestamp,
    );

    return {
      participants,
    };
  },
);
