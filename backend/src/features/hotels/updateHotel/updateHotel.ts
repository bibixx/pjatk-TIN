import {
  HotelTable,
  UpdateHotelRequestDTO,
  UpdateHotelResponseDTO,
} from '@s19192/shared';
import { getNumericId } from 'utils/getNumericId';
import { APIError, withJSON } from 'utils/withJSON/withJSON';
import { getHotelById, updateHotel as updateHotelModel } from '../hotels.model';
import { hotelValidator } from '../hotels.validators';

export const updateHotel = withJSON<
  UpdateHotelResponseDTO,
  UpdateHotelRequestDTO
>(hotelValidator)(async (hotel, req) => {
  const id = getNumericId(req.params.id);

  if (id === null) {
    throw new APIError('Provided id is invalid', 422);
  }

  const oldHotel = await getHotelById(id);

  if (oldHotel === undefined) {
    throw new APIError('Hotel not found', 404);
  }

  const [updatedHotel] = await updateHotelModel(id, hotel);

  return {
    hotel: updatedHotel as HotelTable,
  };
});
