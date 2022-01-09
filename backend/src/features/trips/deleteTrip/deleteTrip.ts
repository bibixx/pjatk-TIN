import { db } from 'core/db';
import { Request, Response } from 'express';
import { deleteTripParticipantsByTripId } from 'features/tripParticipants/tripParticipants.model';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';
import { deleteTrip as deleteTripModel, getTripById } from '../trips.model';

type ViewData =
  | {
      success: true;
    }
  | {
      success: false;
      error: 'NOT_FOUND';
    }
  | {
      success: false;
      error: 'INVALID_ID';
    };

const deleteTripView = (res: Response, data: ViewData) => {
  if (!data.success) {
    return res.redirect(`/trips/?deleteError=true`);
  }

  return res.redirect('/trips/?deleted=true');
};

export const deleteTrip = withView(deleteTripView)(async (req: Request) => {
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

  return db.transaction(async (trx) => {
    await deleteTripParticipantsByTripId(id);
    await deleteTripModel(id).transacting(trx);

    return {
      success: true,
    };
  });
});
