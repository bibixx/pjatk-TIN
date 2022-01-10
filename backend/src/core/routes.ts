import express from 'express';
import { hotelsRouter } from 'features/hotels/hotels.routes';
import { participantsRouter } from 'features/participants/participants.routes';
import { tripParticipantsRouter } from 'features/tripParticipants/tripParticipants.routes';
import { tripsRouter } from 'features/trips/trips.routes';

export const appRouter = express.Router();

appRouter.use('/participants/', participantsRouter);
appRouter.use('/trip-payments/', tripParticipantsRouter);
appRouter.use('/hotels/', hotelsRouter);
appRouter.use('/trips/', tripsRouter);
