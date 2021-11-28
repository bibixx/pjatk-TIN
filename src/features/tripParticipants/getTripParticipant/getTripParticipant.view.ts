import { Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';

type ViewData =
  | {
      success: true;
      data: ViewArguments[ViewNames.TRIP_PARTICIPANT_DETAILS];
    }
  | {
      success: false;
      error: 'INVALID_ID';
    }
  | {
      success: false;
      error: 'NOT_FOUND';
    };

export const getTripParticipantView = (res: Response, data: ViewData) => {
  if (!data.success) {
    // TODO: Error handling
    return res.send('');
  }

  return renderEjs(res, ViewNames.TRIP_PARTICIPANT_DETAILS, data.data);
};
