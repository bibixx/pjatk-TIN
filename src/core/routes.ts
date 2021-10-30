import express from 'express';
import { participantsRouter } from 'services/participants/participants.route';

export const appRouter = express.Router();
appRouter.use('/participants', participantsRouter);
