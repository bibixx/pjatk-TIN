import express from 'express';
import { createParticipant } from './createParticipant/createParticipant';
import { createParticipantForm } from './createParticipantForm/createParticipantForm';
import { deleteParticipant } from './deleteParticipant/deleteParticipant';
import { deleteParticipantForm } from './deleteParticipantForm/deleteParticipantForm';
import { getParticipant } from './getParticipant/getParticipant';
import { getParticipants } from './getParticipants/getParticipants';
import { updateParticipant } from './updateParticipant/updateParticipant';
import { updateParticipantForm } from './updateParticipantForm/updateParticipantForm';

export const participantsRouter = express.Router({
  strict: true,
});

participantsRouter.get('/', getParticipants);

participantsRouter.get('/create/', createParticipantForm);
participantsRouter.post('/create/', createParticipant);

participantsRouter.get('/:id/', getParticipant);

participantsRouter.get('/:id/update/', updateParticipantForm);
participantsRouter.post('/:id/update/', updateParticipant);

participantsRouter.get('/:id/delete/', deleteParticipantForm);
participantsRouter.post('/:id/delete/', deleteParticipant);
