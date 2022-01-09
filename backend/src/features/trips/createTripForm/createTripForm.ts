import { Response } from 'express';
import { getAllHotels } from 'features/hotels/hotels.model';
import { HotelTable } from 'types/tables';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewNames } from 'utils/ejs/types';
import { withView } from 'utils/views/withView';

type ViewData = {
  success: true;
  data: {
    hotels: HotelTable[];
  };
};

const createTripFormView = (res: Response, data: ViewData) => {
  return renderEjs(res, ViewNames.TRIP_CREATE, {
    hotels: data.data.hotels,
    trip: {},
    errors: undefined,
  });
};

export const createTripForm = withView(createTripFormView)(async () => {
  const hotels = await getAllHotels();

  return {
    success: true,
    data: {
      hotels,
    },
  };
});
