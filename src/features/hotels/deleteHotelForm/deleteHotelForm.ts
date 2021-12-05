import { Request, Response } from 'express';
import { getTripsByHotelId } from 'features/trips/trips.model';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';
import { getHotelById } from '../hotels.model';

type ViewData =
  | {
      success: true;
      data: ViewArguments[ViewNames.HOTEL_DELETE];
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
      error: 'TRIP_FOR_HOTEL_EXISTS';
      data: ViewArguments[ViewNames.HOTEL_DELETE_TRIP_EXISTS];
    };

const deleteHotelFormView = (res: Response, data: ViewData) => {
  if (data.success) {
    return renderEjs(res, ViewNames.HOTEL_DELETE, data.data);
  }

  if (data.error === 'TRIP_FOR_HOTEL_EXISTS') {
    return renderEjs(res, ViewNames.HOTEL_DELETE_TRIP_EXISTS, data.data);
  }

  return renderEjs(res, ViewNames.HOTEL_NOT_FOUND, {});
};

export const deleteHotelForm = withView(deleteHotelFormView)(
  async (req: Request) => {
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

    const hotelTrips = await getTripsByHotelId(id);

    if (hotelTrips.length > 0) {
      return {
        success: false,
        error: 'TRIP_FOR_HOTEL_EXISTS',
        data: {
          hotel,
          trips: hotelTrips,
        },
      };
    }

    return {
      success: true,
      data: {
        hotel,
      },
    };
  },
);
