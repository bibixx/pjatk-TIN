import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { withView } from 'utils/views/withView';
import {
  formatParticipant,
  getParticipantInfoById,
} from '../participants.utils';

type ViewData =
  | {
      success: true;
      data: ViewArguments[ViewNames.PARTICIPANT_UPDATE];
    }
  | {
      success: false;
      error: 'NOT_FOUND';
    };

const updateParticipantFormView = (res: Response, data: ViewData) => {
  if (data.success) {
    return renderEjs(res, ViewNames.PARTICIPANT_UPDATE, data.data);
  }

  return renderEjs(res, ViewNames.PARTICIPANT_NOT_FOUND, {});
};

export const updateParticipantForm = withView(updateParticipantFormView)(
  async (req: Request) => {
    const participantInfo = await getParticipantInfoById(req.params.id);

    if (!participantInfo.success) {
      return {
        success: false,
        error: 'NOT_FOUND',
      };
    }

    return {
      success: true,
      data: {
        participant: formatParticipant(participantInfo.participant),
        errors: undefined,
      },
    };
  },
);
