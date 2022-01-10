import { GetHotelsResponseDTO } from '@s19192/shared';
import { withJSON } from 'utils/withJSON/withJSON';
import { getAllHotels } from '../hotels.model';

export const getHotels = withJSON<GetHotelsResponseDTO>()(async () => {
  const hotels = await getAllHotels();

  return {
    hotels,
  };
});
