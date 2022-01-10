import express from 'express';
import { createParticipant } from './createParticipant/createParticipant';
import { deleteParticipant } from './deleteParticipant/deleteParticipant';
import { getParticipant } from './getParticipant/getParticipant';
import { getParticipants } from './getParticipants/getParticipants';
import { updateParticipant } from './updateParticipant/updateParticipant';

export const participantsRouter = express.Router();

participantsRouter.get('/', getParticipants);
participantsRouter.get('/:id/', getParticipant);

participantsRouter.post('/', createParticipant);

participantsRouter.put('/:id/', updateParticipant);

participantsRouter.delete('/:id/', deleteParticipant);
