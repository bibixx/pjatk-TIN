import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { errorsFromEntries } from 'utils/errorsFromEntries';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';
import { getHotelById, updateHotel as updateHotelModel } from '../hotels.model';
import { hotelValidator } from '../hotels.validators';

type ViewData =
  | {
      success: true;
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
      error: 'INVALID_REQUEST_DATA';
      data: ViewArguments[ViewNames.HOTEL_UPDATE];
    };

const updateHotelView = (res: Response, data: ViewData) => {
  if (data.success) {
    return res.redirect('/hotels/?updated=true');
  }

  if (data.error === 'INVALID_ID' || data.error === 'NOT_FOUND') {
    return res.redirect('/hotels/?error=true');
  }

  if (data.error === 'INVALID_REQUEST_DATA') {
    return renderEjs(res, ViewNames.HOTEL_UPDATE, data.data);
  }

  const shouldBeNever: never = data;
  return shouldBeNever;
};

export const updateHotel = withView(updateHotelView)(async (req: Request) => {
  const id = getNumericId(req.params.id);

  if (id === null) {
    return {
      success: false,
      error: 'INVALID_ID',
    };
  }

  const { body } = req;

  const validationResult = hotelValidator(body);
  const oldHotel = await getHotelById(id);

  if (oldHotel === undefined) {
    return {
      success: false,
      error: 'NOT_FOUND',
    };
  }

  if (!validationResult.success) {
    return {
      success: false,
      error: 'INVALID_REQUEST_DATA',
      data: {
        hotel: body,
        errors: errorsFromEntries(validationResult.errors),
      },
    };
  }

  const hotel = validationResult.value;

  await updateHotelModel(id, hotel);

  return {
    success: true,
  };
});
