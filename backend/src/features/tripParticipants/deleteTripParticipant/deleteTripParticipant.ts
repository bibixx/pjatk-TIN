import { Request, Response } from 'express';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';
import {
  getTripParticipantById,
  deleteTripParticipant as deleteTripParticipantModel,
} from '../tripParticipants.model';

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
    }
  | {
      success: false;
      error: 'TRIP_FOR_HOTEL_EXISTS';
    };

const deleteTripParticipantView = (res: Response, data: ViewData) => {
  if (!data.success) {
    return res.redirect(`/trip-payments/?deleteError=true`);
  }

  return res.redirect('/trip-payments/?deleted=true');
};

export const deleteTripParticipant = withView(deleteTripParticipantView)(
  async (req: Request) => {
    const id = getNumericId(req.params.id);

    if (id === null) {
      return {
        success: false,
        error: 'INVALID_ID',
      };
    }

    const tripParticipant = await getTripParticipantById(id);

    if (tripParticipant === undefined) {
      return {
        success: false,
        error: 'NOT_FOUND',
      };
    }

    await deleteTripParticipantModel(id);

    return {
      success: true,
    };
  },
);
