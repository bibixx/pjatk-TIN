import express from 'express';
import { createTripParticipant } from './createTripParticipant/createTripParticipant';
import { createTripParticipantForm } from './createTripParticipantForm/createTripParticipantForm';
import { deleteTripParticipant } from './deleteTripParticipant/deleteTripParticipant';
import { deleteTripParticipantForm } from './deleteTripParticipantForm/deleteTripParticipantForm';
import { getTripParticipant } from './getTripParticipant/getTripParticipant';
import { getTripParticipants } from './getTripParticipants/getTripParticipants';
import { updateTripParticipant } from './updateTripParticipant/updateTripParticipant';
import { updateTripParticipantForm } from './updateTripParticipantForm/updateTripParticipantForm';

export const tripParticipantsRouter = express.Router({
  strict: true,
});

tripParticipantsRouter.get('/', getTripParticipants);

tripParticipantsRouter.get('/create/', createTripParticipantForm);
tripParticipantsRouter.post('/create/', createTripParticipant);

tripParticipantsRouter.get('/:id/', getTripParticipant);

tripParticipantsRouter.get('/:id/update/', updateTripParticipantForm);
tripParticipantsRouter.post('/:id/update/', updateTripParticipant);

tripParticipantsRouter.get('/:id/delete/', deleteTripParticipantForm);
tripParticipantsRouter.post('/:id/delete/', deleteTripParticipant);
