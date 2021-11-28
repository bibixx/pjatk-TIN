import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { errorsFromEntries } from 'utils/errorsFromEntries';
import { withView } from 'utils/views/withView';
import { hotelValidator } from '../hotels.validators';
import { createHotel as createHotelModel } from '../hotels.model';

type ViewData =
  | {
      success: true;
    }
  | {
      success: false;
      error: 'INVALID_REQUEST_DATA';
      data: ViewArguments[ViewNames.HOTEL_CREATE];
    };

const createHotelView = (res: Response, data: ViewData) => {
  if (!data.success && data.error === 'INVALID_REQUEST_DATA') {
    return renderEjs(res, ViewNames.HOTEL_CREATE, data.data);
  }

  res.redirect('/hotels/?added=true');
  return undefined;
};

export const createHotel = withView(createHotelView)(async (req: Request) => {
  const { body } = req;

  const validationResult = hotelValidator(body);

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

  await createHotelModel(hotel);

  return {
    success: true,
  };
});
