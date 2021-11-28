import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { errorsFromEntries } from 'utils/errorsFromEntries';
import { withView } from 'utils/views/withView';
import { getAllHotels } from 'features/hotels/hotels.model';
import { tripValidator } from '../trips.validators';
import { createTrip as createTripModel } from '../trips.model';

type ViewData =
  | {
      success: true;
    }
  | {
      success: false;
      error: 'INVALID_REQUEST_DATA';
      data: ViewArguments[ViewNames.TRIP_CREATE];
    };

const createTripView = (res: Response, data: ViewData) => {
  if (!data.success && data.error === 'INVALID_REQUEST_DATA') {
    return renderEjs(res, ViewNames.TRIP_CREATE, data.data);
  }

  res.redirect('/trips/?added=true');
  return undefined;
};

export const createTrip = withView(createTripView)(async (req: Request) => {
  const { body } = req;

  const validationResult = tripValidator(body);

  if (!validationResult.success) {
    const hotels = await getAllHotels();

    return {
      success: false,
      error: 'INVALID_REQUEST_DATA',
      data: {
        trip: body,
        hotels,
        errors: errorsFromEntries(validationResult.errors),
      },
    };
  }

  const trip = validationResult.value;

  await createTripModel(trip);

  return {
    success: true,
  };
});
