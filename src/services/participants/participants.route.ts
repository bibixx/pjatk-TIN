import express from 'express';
import {
  getParticipants,
  getParticipant,
  deleteParticipant,
  createParticipant,
  updateParticipant,
} from './participants.controller';

export const participantsRouter = express.Router();

participantsRouter.get('/', getParticipants);
participantsRouter.get('/:id', getParticipant);
participantsRouter.delete('/:id', deleteParticipant);
participantsRouter.post('/', createParticipant);
participantsRouter.put('/:id', updateParticipant);
