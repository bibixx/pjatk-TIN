import { Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewArguments, ViewNames } from 'utils/ejs/types';

type ViewData = {
  success: true;
  data: ViewArguments[ViewNames.TRIP_PARTICIPANT_LIST];
};

export const getTripParticipantsView = (res: Response, data: ViewData) => {
  return renderEjs(res, ViewNames.TRIP_PARTICIPANT_LIST, data.data);
};
