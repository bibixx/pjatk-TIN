import express from 'express';
import { createTrip } from './createTrip/createTrip';
import { deleteTrip } from './deleteTrip/deleteTrip';
import { getTrip } from './getTrip/getTrip';
import { getTrips } from './getTrips/getTrips';
import { updateTrip } from './updateTrip/updateTrip';

export const tripsRouter = express.Router();

tripsRouter.get('/', getTrips);
tripsRouter.get('/:id/', getTrip);

tripsRouter.post('/', createTrip);
tripsRouter.put('/:id/', updateTrip);
tripsRouter.delete('/:id/', deleteTrip);
