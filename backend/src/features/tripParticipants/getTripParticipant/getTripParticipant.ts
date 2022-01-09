import { Request, Response } from 'express';
import { getHotelById } from 'features/hotels/hotels.model';
import { HotelTable } from 'types/tables';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';
import { getNumericId } from 'utils/getNumericId';
import { withView } from 'utils/views/withView';
import { getTripParticipantById } from '../tripParticipants.model';

type ViewData =
  | {
      success: false;
      error: 'NOT_FOUND';
    }
  | {
      success: false;
      error: 'INVALID_ID';
    }
  | {
      success: true;
      data: ViewArguments[ViewNames.TRIP_PARTICIPANT_DETAILS];
    };

const getTripParticipantView = (res: Response, data: ViewData) => {
  if (data.success) {
    return renderEjs(res, ViewNames.TRIP_PARTICIPANT_DETAILS, data.data);
  }

  return renderEjs(res, ViewNames.TRIP_PARTICIPANT_NOT_FOUND, {});
};

export const getTripParticipant = withView(getTripParticipantView)(
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

    const hotel = (await getHotelById(
      tripParticipant.trip.idhotel,
    )) as HotelTable;

    return {
      success: true,
      data: {
        tripParticipant,
        hotel,
      },
    };
  },
);
