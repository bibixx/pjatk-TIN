import express from 'express';
import { createTrip } from './createTrip/createTrip';
import { createTripForm } from './createTripForm/createTripForm';
import { deleteTrip } from './deleteTrip/deleteTrip';
import { deleteTripForm } from './deleteTripForm/deleteTripForm';
import { getTrip } from './getTrip/getTrip';
import { getTrips } from './getTrips/getTrips';
import { updateTrip } from './updateTrip/updateTrip';
import { updateTripForm } from './updateTripForm/updateTripForm';

export const tripsRouter = express.Router({
  strict: true,
});

tripsRouter.get('/', getTrips);

tripsRouter.get('/create/', createTripForm);
tripsRouter.post('/create/', createTrip);

tripsRouter.get('/:id/', getTrip);

tripsRouter.get('/:id/update/', updateTripForm);
tripsRouter.post('/:id/update/', updateTrip);

tripsRouter.get('/:id/delete/', deleteTripForm);
tripsRouter.post('/:id/delete/', deleteTrip);
