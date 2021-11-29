import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { withView } from 'utils/views/withView';
import { getAllTripParticipants } from '../tripParticipants.model';

const getTripParticipantsView = (
  res: Response,
  data: ViewArguments[ViewNames.TRIP_PARTICIPANT_LIST],
) => {
  return renderEjs(res, ViewNames.TRIP_PARTICIPANT_LIST, data);
};

export const getTripParticipants = withView(getTripParticipantsView)(
  async (req: Request) => {
    const tripParticipants = await getAllTripParticipants();
    const hasSuccess = req.query.updated === 'true';
    const hasDeleted = req.query.deleted === 'true';
    const hasAdded = req.query.added === 'true';
    const hasError = req.query.deleteError === 'true';

    return {
      tripParticipants,
      hasSuccess,
      hasDeleted,
      hasAdded,
      hasError,
    };
  },
);
