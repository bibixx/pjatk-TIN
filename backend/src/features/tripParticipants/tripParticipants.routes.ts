import express from 'express';
import { useAuth } from 'middlewares/useAuth/useAuth';
import { createTripParticipant } from './createTripParticipant/createTripParticipant';
import { deleteTripParticipant } from './deleteTripParticipant/deleteTripParticipant';
import { getTripParticipant } from './getTripParticipant/getTripParticipant';
import { getTripParticipants } from './getTripParticipants/getTripParticipants';
import { updateTripParticipant } from './updateTripParticipant/updateTripParticipant';

export const tripParticipantsRouter = express.Router();

tripParticipantsRouter.use(useAuth());

tripParticipantsRouter.get('/', getTripParticipants);
tripParticipantsRouter.get('/:id/', getTripParticipant);

tripParticipantsRouter.use(useAuth(['admin']));
tripParticipantsRouter.post('/', createTripParticipant);
tripParticipantsRouter.put('/:id/', updateTripParticipant);
tripParticipantsRouter.delete('/:id/', deleteTripParticipant);
