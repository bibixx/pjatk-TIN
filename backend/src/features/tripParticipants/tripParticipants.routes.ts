import express from 'express';
import { createTripParticipant } from './createTripParticipant/createTripParticipant';
import { deleteTripParticipant } from './deleteTripParticipant/deleteTripParticipant';
import { getTripParticipant } from './getTripParticipant/getTripParticipant';
import { getTripParticipants } from './getTripParticipants/getTripParticipants';
import { updateTripParticipant } from './updateTripParticipant/updateTripParticipant';

export const tripParticipantsRouter = express.Router();

tripParticipantsRouter.get('/', getTripParticipants);
tripParticipantsRouter.get('/:id/', getTripParticipant);

tripParticipantsRouter.post('/', createTripParticipant);

tripParticipantsRouter.put('/:id/', updateTripParticipant);

tripParticipantsRouter.delete('/:id/', deleteTripParticipant);
