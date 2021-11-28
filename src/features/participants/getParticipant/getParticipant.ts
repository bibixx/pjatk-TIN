import { Request, Response } from 'express';
import { getTripParticipantsByParticipantId } from 'features/tripParticipants/tripParticipants.model';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { withView } from 'utils/views/withView';
import {
  formatParticipant,
  formatTripParticipant,
  getParticipantInfoById,
} from '../participants.utils';

type ViewData =
  | {
      success: false;
      error: 'NOT_FOUND';
    }
  | {
      success: true;
      data: ViewArguments[ViewNames.PARTICIPANT_DETAILS];
    };

const getParticipantView = (res: Response, data: ViewData) => {
  if (data.success) {
    return renderEjs(res, ViewNames.PARTICIPANT_DETAILS, data.data);
  }

  return renderEjs(res, ViewNames.PARTICIPANT_NOT_FOUND, {});
};

export const getParticipant = withView(getParticipantView)(
  async (req: Request) => {
    const { id } = req.params;
    const participantInfo = await getParticipantInfoById(id);

    if (!participantInfo.success) {
      return {
        success: false,
        error: 'NOT_FOUND',
      };
    }

    const tripParticipants = await getTripParticipantsByParticipantId(
      id as any,
    );

    return {
      success: true,
      data: {
        participant: formatParticipant(participantInfo.participant),
        tripParticipants: tripParticipants.map(formatTripParticipant),
      },
    };
  },
);
