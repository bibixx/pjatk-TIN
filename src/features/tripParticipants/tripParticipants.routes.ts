import express from 'express';
import { getTripParticipant } from './getTripParticipant/getTripParticipant.controller';
import { getTripParticipants } from './getTripParticipants/getTripParticipants.controller';

export const tripParticipantsRouter = express.Router({
  strict: true,
});

tripParticipantsRouter.get('/', getTripParticipants);
tripParticipantsRouter.get('/:id/', getTripParticipant);
