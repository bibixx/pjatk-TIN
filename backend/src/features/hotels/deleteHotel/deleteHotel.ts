import { DeleteHotelResponseDTO } from '@s19192/shared';
import { db } from 'core/db';
import { getTripsByHotelId } from 'features/trips/trips.model';
import { getNumericId } from 'utils/getNumericId';
import { APIError, withJSON } from 'utils/withJSON/withJSON';
import { getHotelById, deleteHotel as deleteHotelModel } from '../hotels.model';

export const deleteHotel = withJSON<DeleteHotelResponseDTO>()(
  async (_body, req) => {
    const id = getNumericId(req.params.id);

    if (id === null) {
      throw new APIError('Provided id is invalid', 422);
    }

    const hotel = await getHotelById(id);

    if (hotel === undefined) {
      throw new APIError('Hotel not found', 404);
    }

    return db.transaction(async (trx) => {
      const hotelTrips = await getTripsByHotelId(id).transacting(trx);

      if (hotelTrips.length > 0) {
        throw new APIError('A trip still exists for the specified hotel', 409, {
          hotel,
        });
      }

      await deleteHotelModel(id).transacting(trx);

      return {};
    });
  },
);
