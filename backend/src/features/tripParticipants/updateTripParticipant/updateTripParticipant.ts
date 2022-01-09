import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { errorsFromEntries } from 'utils/errorsFromEntries';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';
import { getAllParticipants } from 'features/participants/participants.model';
import { getAllTrips } from 'features/trips/trips.model';
import { parseNestedDate } from 'utils/parseNestedDate';
import {
  getTripParticipantById,
  updateTripParticipant as updateTripParticipantModel,
} from '../tripParticipants.model';
import { tripParticipantValidator } from '../tripParticipants.validators';

type ViewData =
  | {
      success: true;
    }
  | {
      success: false;
      error: 'INVALID_ID';
    }
  | {
      success: false;
      error: 'NOT_FOUND';
    }
  | {
      success: false;
      error: 'INVALID_REQUEST_DATA';
      data: ViewArguments[ViewNames.TRIP_PARTICIPANT_UPDATE];
    };

const updateTripParticipantView = (res: Response, data: ViewData) => {
  if (data.success) {
    return res.redirect('/trip-payments/?updated=true');
  }

  if (data.error === 'INVALID_ID' || data.error === 'NOT_FOUND') {
    return res.redirect('/trip-payments/?error=true');
  }

  if (data.error === 'INVALID_REQUEST_DATA') {
    return renderEjs(res, ViewNames.TRIP_PARTICIPANT_UPDATE, data.data);
  }

  const shouldBeNever: never = data;
  return shouldBeNever;
};

export const updateTripParticipant = withView(updateTripParticipantView)(
  async (req: Request) => {
    const id = getNumericId(req.params.id);

    if (id === null) {
      return {
        success: false,
        error: 'INVALID_ID',
      };
    }

    const { body } = req;

    const validationResult = tripParticipantValidator(body);
    const oldTripParticipant = await getTripParticipantById(id);

    if (oldTripParticipant === undefined) {
      return {
        success: false,
        error: 'NOT_FOUND',
      };
    }

    if (!validationResult.success) {
      const participants = await getAllParticipants();
      const trips = await getAllTrips();

      return {
        success: false,
        error: 'INVALID_REQUEST_DATA',
        data: {
          participants,
          trips,
          tripParticipant: parseNestedDate(['dateofpayment'], body),
          errors: errorsFromEntries(validationResult.errors),
        },
      };
    }

    const tripParticipant = validationResult.value;

    await updateTripParticipantModel(id, tripParticipant);

    return {
      success: true,
    };
  },
);
