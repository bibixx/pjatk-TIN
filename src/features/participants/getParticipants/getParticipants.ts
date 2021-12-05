import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { withView } from 'utils/views/withView';
import { getAllParticipants } from '../participants.model';

const getParticipantsView = (
  res: Response,
  data: ViewArguments[ViewNames.PARTICIPANT_LIST],
) => {
  return renderEjs(res, ViewNames.PARTICIPANT_LIST, data);
};

export const getParticipants = withView(getParticipantsView)(
  async (req: Request) => {
    const participants = await getAllParticipants();
    const hasSuccess = req.query.updated === 'true';
    const hasDeleted = req.query.deleted === 'true';
    const hasAdded = req.query.added === 'true';
    const hasError = req.query.deleteError === 'true';

    return {
      participants,
      hasSuccess,
      hasDeleted,
      hasAdded,
      hasError,
    };
  },
);
