import { Request, Response } from 'express';
import { getAllHotels } from 'features/hotels/hotels.model';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { errorsFromEntries } from 'utils/errorsFromEntries';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';
import { getTripById, updateTrip as updateTripModel } from '../trips.model';
import { formatIncomingTripData } from '../trips.utils';
import { tripValidator } from '../trips.validators';

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
      data: ViewArguments[ViewNames.TRIP_UPDATE];
    };

const updateTripView = (res: Response, data: ViewData) => {
  if (data.success) {
    return res.redirect('/trips/?updated=true');
  }

  if (data.error === 'INVALID_ID' || data.error === 'NOT_FOUND') {
    return res.redirect('/trips/?error=true');
  }

  if (data.error === 'INVALID_REQUEST_DATA') {
    return renderEjs(res, ViewNames.TRIP_UPDATE, data.data);
  }

  const shouldBeNever: never = data;
  return shouldBeNever;
};

export const updateTrip = withView(updateTripView)(async (req: Request) => {
  const id = getNumericId(req.params.id);

  if (id === null) {
    return {
      success: false,
      error: 'INVALID_ID',
    };
  }

  const { body } = req;

  const validationResult = tripValidator(body);
  const oldTrip = await getTripById(id);

  if (oldTrip === undefined) {
    return {
      success: false,
      error: 'NOT_FOUND',
    };
  }

  if (!validationResult.success) {
    const hotels = await getAllHotels();

    return {
      success: false,
      error: 'INVALID_REQUEST_DATA',
      data: {
        trip: formatIncomingTripData(body),
        hotels,
        errors: errorsFromEntries(validationResult.errors),
      },
    };
  }

  const trip = validationResult.value;

  await updateTripModel(id, trip);

  return {
    success: true,
  };
});
