import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';
import { getTripParticipantById } from '../tripParticipants.model';

type ViewData =
  | {
      success: true;
      data: ViewArguments[ViewNames.TRIP_PARTICIPANT_DELETE];
    }
  | {
      success: false;
      error: 'INVALID_ID';
    }
  | {
      success: false;
      error: 'NOT_FOUND';
    };

const deleteTripParticipantFormView = (res: Response, data: ViewData) => {
  if (data.success) {
    return renderEjs(res, ViewNames.TRIP_PARTICIPANT_DELETE, data.data);
  }

  return renderEjs(res, ViewNames.TRIP_PARTICIPANT_NOT_FOUND, {});
};

export const deleteTripParticipantForm = withView(
  deleteTripParticipantFormView,
)(async (req: Request) => {
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
      tripParticipant,
    },
  };
});
