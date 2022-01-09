import { Response } from 'express';
import { getAllParticipants } from 'features/participants/participants.model';
import { getAllTrips } from 'features/trips/trips.model';
import { ParticipantTable, TripTable } from 'types/tables';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewNames } from 'utils/ejs/types';
import { withView } from 'utils/views/withView';

type ViewData = {
  success: true;
  data: {
    participants: ParticipantTable[];
    trips: TripTable[];
  };
};

const createTripParticipantFormView = (res: Response, data: ViewData) => {
  return renderEjs(res, ViewNames.TRIP_PARTICIPANT_CREATE, {
    tripParticipant: {},
    errors: undefined,
    participants: data.data.participants,
    trips: data.data.trips,
  });
};

export const createTripParticipantForm = withView(
  createTripParticipantFormView,
)(async () => {
  const participants = await getAllParticipants();
  const trips = await getAllTrips();

  return {
    success: true,
    data: {
      participants,
      trips,
    },
  };
});
