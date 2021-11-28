import { db } from 'core/db';
import { Request, Response } from 'express';
import { getTripsByHotelId } from 'features/trips/trips.model';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';
import { getHotelById, deleteHotel as deleteHotelModel } from '../hotels.model';

type ViewData =
  | {
      success: true;
    }
  | {
      success: false;
      error: 'NOT_FOUND';
    }
  | {
      success: false;
      error: 'INVALID_ID';
    }
  | {
      success: false;
      error: 'TRIP_FOR_HOTEL_EXISTS';
    };

const deleteHotelView = (res: Response, data: ViewData) => {
  if (!data.success) {
    return res.redirect(`/hotels/?deleteError=true`);
  }

  return res.redirect('/hotels/?deleted=true');
};

export const deleteHotel = withView(deleteHotelView)(async (req: Request) => {
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

  return db.transaction(async (trx) => {
    const hotelTrips = await getTripsByHotelId(id).transacting(trx);

    if (hotelTrips.length > 0) {
      return {
        success: false,
        error: 'TRIP_FOR_HOTEL_EXISTS',
        data: {
          hotel,
        },
      };
    }

    await deleteHotelModel(id).transacting(trx);

    return {
      success: true,
    };
  });
});
