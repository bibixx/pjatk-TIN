import { Request, Response } from 'express';
import { getAllHotels } from 'features/hotels/hotels.model';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';
import { getTripById } from '../trips.model';

type ViewData =
  | {
      success: true;
      data: ViewArguments[ViewNames.TRIP_UPDATE];
    }
  | {
      success: false;
      error: 'INVALID_ID';
    }
  | {
      success: false;
      error: 'NOT_FOUND';
    };

const updateTripFormView = (res: Response, data: ViewData) => {
  if (data.success) {
    return renderEjs(res, ViewNames.TRIP_UPDATE, data.data);
  }

  return renderEjs(res, ViewNames.TRIP_NOT_FOUND, {});
};

export const updateTripForm = withView(updateTripFormView)(
  async (req: Request) => {
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

    const hotels = await getAllHotels();

    return {
      success: true,
      data: {
        trip,
        hotels,
        errors: undefined,
      },
    };
  },
);
