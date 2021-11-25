import express from 'express';
import {
  createParticipant,
  getCreateParticipantView,
} from './controllers/participants.controllers.create';
import {
  deleteParticipant,
  getDeleteParticipantView,
} from './controllers/participants.controllers.delete';
import {
  getParticipant,
  getParticipants,
} from './controllers/participants.controllers.get';
import {
  updateParticipant,
  getUpdateParticipantView,
} from './controllers/participants.controllers.update';

export const participantsRouter = express.Router({
  strict: true,
});

participantsRouter.get('/', getParticipants);

participantsRouter.get('/create/', getCreateParticipantView);
participantsRouter.post('/create/', createParticipant);

participantsRouter.get('/:id/', getParticipant);

participantsRouter.get('/:id/update/', getUpdateParticipantView);
participantsRouter.post('/:id/update/', updateParticipant);

participantsRouter.get('/:id/delete/', getDeleteParticipantView);
participantsRouter.post('/:id/delete/', deleteParticipant);
