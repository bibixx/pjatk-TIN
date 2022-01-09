import { Request, Response } from 'express';
import { getTripsByHotelId } from 'features/trips/trips.model';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';
import { getHotelById } from '../hotels.model';

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
      data: ViewArguments[ViewNames.HOTEL_DETAILS];
    };

const getHotelView = (res: Response, data: ViewData) => {
  if (data.success) {
    return renderEjs(res, ViewNames.HOTEL_DETAILS, data.data);
  }

  return renderEjs(res, ViewNames.HOTEL_NOT_FOUND, {});
};

export const getHotel = withView(getHotelView)(async (req: Request) => {
  const id = getNumericId(req.params.id);

  if (id === null) {
    return {
      success: false,
      error: 'INVALID_ID',
    };
  }

  const hotel = await getHotelById(id);

  if (hotel === undefined) {
    return {
      success: false,
      error: 'NOT_FOUND',
    };
  }

  const trips = await getTripsByHotelId(id);

  return {
    success: true,
    data: {
      hotel,
      trips,
    },
  };
});
