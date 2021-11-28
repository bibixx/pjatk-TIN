import { Request, Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { withView } from 'utils/views/withView';
import { getAllTrips } from '../trips.model';

const getTripsView = (
  res: Response,
  data: ViewArguments[ViewNames.TRIP_LIST],
) => {
  return renderEjs(res, ViewNames.TRIP_LIST, data);
};

export const getTrips = withView(getTripsView)(async (req: Request) => {
  const trips = await getAllTrips();
  const hasSuccess = req.query.updated === 'true';
  const hasDeleted = req.query.deleted === 'true';
  const hasAdded = req.query.added === 'true';
  const hasError = req.query.deleteError === 'true';

  return {
    trips,
    hasSuccess,
    hasDeleted,
    hasAdded,
    hasError,
  };
});
