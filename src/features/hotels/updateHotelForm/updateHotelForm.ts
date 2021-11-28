import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';
import { getHotelById } from '../hotels.model';

type ViewData =
  | {
      success: true;
      data: ViewArguments[ViewNames.HOTEL_UPDATE];
    }
  | {
      success: false;
      error: 'INVALID_ID';
    }
  | {
      success: false;
      error: 'NOT_FOUND';
    };

const updateHotelFormView = (res: Response, data: ViewData) => {
  if (data.success) {
    return renderEjs(res, ViewNames.HOTEL_UPDATE, data.data);
  }

  return renderEjs(res, ViewNames.HOTEL_NOT_FOUND, {});
};

export const updateHotelForm = withView(updateHotelFormView)(
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

    return {
      success: true,
      data: {
        hotel,
        errors: undefined,
      },
    };
  },
);
