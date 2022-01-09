import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { withView } from 'utils/views/withView';
import { getAllHotels } from '../hotels.model';

const getHotelsView = (
  res: Response,
  data: ViewArguments[ViewNames.HOTEL_LIST],
) => {
  return renderEjs(res, ViewNames.HOTEL_LIST, data);
};

export const getHotels = withView(getHotelsView)(async (req: Request) => {
  const hotels = await getAllHotels();
  const hasSuccess = req.query.updated === 'true';
  const hasDeleted = req.query.deleted === 'true';
  const hasAdded = req.query.added === 'true';
  const hasError = req.query.deleteError === 'true';

  return {
    hotels,
    hasSuccess,
    hasDeleted,
    hasAdded,
    hasError,
  };
});
