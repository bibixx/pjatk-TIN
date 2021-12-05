import { Request, Response } from 'express';
import { getTripParticipantsByParticipantId } from 'features/tripParticipants/tripParticipants.model';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';
import { getParticipantById } from '../participants.model';

type ViewData =
  | {
      success: true;
      data: ViewArguments[ViewNames.PARTICIPANT_DELETE];
    }
  | {
      success: false;
      error: 'NOT_FOUND';
    }
  | {
      success: false;
      error: 'INVALID_ID';
    };

const deleteParticipantFormView = (res: Response, data: ViewData) => {
  if (data.success) {
    return renderEjs(res, ViewNames.PARTICIPANT_DELETE, data.data);
  }

  return renderEjs(res, ViewNames.PARTICIPANT_NOT_FOUND, {});
};

export const deleteParticipantForm = withView(deleteParticipantFormView)(
  async (req: Request) => {
    const id = getNumericId(req.params.id);

    if (id === null) {
      return {
        success: false,
        error: 'INVALID_ID',
      };
    }

    const participant = await getParticipantById(id);

    if (participant === undefined) {
      return {
        success: false,
        error: 'NOT_FOUND',
      };
    }

    const tripParticipants = await getTripParticipantsByParticipantId(id);

    return {
      success: true,
      data: {
        participant,
        tripParticipants,
      },
    };
  },
);
