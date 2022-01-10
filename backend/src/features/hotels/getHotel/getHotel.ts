import { GetHotelResponseDTO } from '@s19192/shared';
import { getNumericId } from 'utils/getNumericId';
import { APIError, withJSON } from 'utils/withJSON/withJSON';
import { getHotelById } from '../hotels.model';

export const getHotel = withJSON<GetHotelResponseDTO>()(async (_body, req) => {
  const id = getNumericId(req.params.id);

  if (id === null) {
    throw new APIError('Provided id is invalid', 422);
  }

  const hotel = await getHotelById(id);

  if (hotel === undefined) {
    throw new APIError('Hotel not found', 404);
  }

  return {
    hotel,
  };
});
