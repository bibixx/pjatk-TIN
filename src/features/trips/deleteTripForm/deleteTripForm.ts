import { Request, Response } from 'express';
import { getTripParticipantsByTripId } from 'features/tripParticipants/tripParticipants.model';
import { getTripById } from 'features/trips/trips.model';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';

type ViewData =
  | {
      success: true;
      data: ViewArguments[ViewNames.TRIP_DELETE];
    }
  | {
      success: false;
      error: 'INVALID_ID';
    }
  | {
      success: false;
      error: 'NOT_FOUND';
    };

const deleteTripFormView = (res: Response, data: ViewData) => {
  if (data.success) {
    return renderEjs(res, ViewNames.TRIP_DELETE, data.data);
  }

  return renderEjs(res, ViewNames.TRIP_NOT_FOUND, {});
};

export const deleteTripForm = withView(deleteTripFormView)(
  async (req: Request) => {
    const id = getNumericId(req.params.id);

    if (id === null) {
      return {
        success: false,
        error: 'INVALID_ID',
      };
    }

    const trip = await getTripById(id);

    if (trip === undefined) {
      return {
        success: false,
        error: 'NOT_FOUND',
      };
    }

    const tripParticipants = await getTripParticipantsByTripId(id);

    return {
      success: true,
      data: {
        trip,
        tripParticipants,
      },
    };
  },
);
