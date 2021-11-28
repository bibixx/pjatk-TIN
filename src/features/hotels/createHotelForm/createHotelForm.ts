import { Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewNames } from 'utils/ejs/types';
import { withView } from 'utils/views/withView';

const createHotelFormView = (res: Response) => {
  return renderEjs(res, ViewNames.HOTEL_CREATE, {
    hotel: {},
    errors: undefined,
  });
};

export const createHotelForm = withView(createHotelFormView)(async () => {});
