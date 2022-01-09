import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { errorsFromEntries } from 'utils/errorsFromEntries';
import { withView } from 'utils/views/withView';
import { getAllParticipants } from 'features/participants/participants.model';
import { getAllTrips } from 'features/trips/trips.model';
import { parseNestedDate } from 'utils/parseNestedDate';
import { tripParticipantValidator } from '../tripParticipants.validators';
import { createTripParticipant as createTripParticipantModel } from '../tripParticipants.model';

type ViewData =
  | {
      success: true;
    }
  | {
      success: false;
      error: 'INVALID_REQUEST_DATA';
      data: ViewArguments[ViewNames.TRIP_PARTICIPANT_CREATE];
    };

const createTripParticipantView = (res: Response, data: ViewData) => {
  if (!data.success && data.error === 'INVALID_REQUEST_DATA') {
    return renderEjs(res, ViewNames.TRIP_PARTICIPANT_CREATE, data.data);
  }

  res.redirect('/trip-payments/?added=true');
  return undefined;
};

export const createTripParticipant = withView(createTripParticipantView)(
  async (req: Request) => {
    const { body } = req;

    const validationResult = tripParticipantValidator(body);

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

    await createTripParticipantModel(tripParticipant);

    return {
      success: true,
    };
  },
);
