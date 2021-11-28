import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { withView } from 'utils/views/withView';
import { getAllParticipants } from '../participants.model';
import { formatParticipant } from '../participants.utils';

const getParticipantsView = (
  res: Response,
  data: ViewArguments[ViewNames.PARTICIPANTS_LIST],
) => {
  return renderEjs(res, ViewNames.PARTICIPANTS_LIST, data);
};

export const getParticipants = withView(getParticipantsView)(
  async (req: Request) => {
    const participants = await getAllParticipants();
    const hasSuccess = req.query.updated === 'true';
    const hasDeleted = req.query.deleted === 'true';
    const hasAdded = req.query.added === 'true';
    const hasError = req.query.deleteError === 'true';

    return {
      participants: participants.map(formatParticipant),
      hasSuccess,
      hasDeleted,
      hasAdded,
      hasError,
    };
  },
);
