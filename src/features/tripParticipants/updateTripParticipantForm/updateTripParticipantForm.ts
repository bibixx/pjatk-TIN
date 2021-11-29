import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';
import { getAllParticipants } from 'features/participants/participants.model';
import { getAllTrips } from 'features/trips/trips.model';
import { getTripParticipantById } from '../tripParticipants.model';

type ViewData =
  | {
      success: true;
      data: ViewArguments[ViewNames.TRIP_PARTICIPANT_UPDATE];
    }
  | {
      success: false;
      error: 'INVALID_ID';
    }
  | {
      success: false;
      error: 'NOT_FOUND';
    };

const updateTripParticipantFormView = (res: Response, data: ViewData) => {
  if (data.success) {
    return renderEjs(res, ViewNames.TRIP_PARTICIPANT_UPDATE, data.data);
  }

  return renderEjs(res, ViewNames.TRIP_PARTICIPANT_NOT_FOUND, {}, 404);
};

export const updateTripParticipantForm = withView(
  updateTripParticipantFormView,
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

  const participants = await getAllParticipants();
  const trips = await getAllTrips();

  return {
    success: true,
    data: {
      participants,
      trips,
      tripParticipant,
      errors: undefined,
    },
  };
});
