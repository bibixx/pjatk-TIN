import { Request, Response } from 'express';
import { getHotelById } from 'features/hotels/hotels.model';
import { getTripById } from 'features/trips/trips.model';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';

type ViewData =
  | {
      success: false;
      error: 'NOT_FOUND';
    }
  | {
      success: false;
      error: 'INVALID_ID';
    }
  | {
      success: true;
      data: ViewArguments[ViewNames.TRIP_DETAILS];
    };

const getTripView = (res: Response, data: ViewData) => {
  if (data.success) {
    return renderEjs(res, ViewNames.TRIP_DETAILS, data.data);
  }

  return renderEjs(res, ViewNames.TRIP_NOT_FOUND, {});
};

export const getTrip = withView(getTripView)(async (req: Request) => {
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

  const hotel = await getHotelById(trip.idhotel);

  return {
    success: true,
    data: {
      hotel,
      trip,
    },
  };
});
