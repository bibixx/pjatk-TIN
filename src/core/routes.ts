import express from 'express';
import { homeRouter } from 'services/home/home.route';
import { participantsRouter } from 'services/participants/participants.routes';

export const appRouter = express.Router({
  strict: true,
});
appRouter.use('/', homeRouter);
appRouter.use('/participants/', participantsRouter);
