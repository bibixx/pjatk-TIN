import { withJSON } from 'utils/withJSON/withJSON';
import {
  CreateHotelRequestDTO,
  CreateHotelResponseDTO,
  HotelTable,
  hotelValidator,
} from '@s19192/shared';
import { createHotel as createHotelModel } from '../hotels.model';

export const createHotel = withJSON<
  CreateHotelResponseDTO,
  CreateHotelRequestDTO
>(hotelValidator)(async (hotel) => {
  const [newHotel] = await createHotelModel(hotel);

  return {
    hotel: newHotel as HotelTable,
  };
});
