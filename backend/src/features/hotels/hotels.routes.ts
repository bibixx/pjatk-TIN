import express from 'express';
import { createHotel } from './createHotel/createHotel';
import { createHotelForm } from './createHotelForm/createHotelForm';
import { deleteHotel } from './deleteHotel/deleteHotel';
import { deleteHotelForm } from './deleteHotelForm/deleteHotelForm';
import { getHotel } from './getHotel/getHotel';
import { getHotels } from './getHotels/getHotels';
import { updateHotel } from './updateHotel/updateHotel';
import { updateHotelForm } from './updateHotelForm/updateHotelForm';

export const hotelsRouter = express.Router({
  strict: true,
});

hotelsRouter.get('/', getHotels);

hotelsRouter.get('/create/', createHotelForm);
hotelsRouter.post('/create/', createHotel);

hotelsRouter.get('/:id/', getHotel);

hotelsRouter.get('/:id/update/', updateHotelForm);
hotelsRouter.post('/:id/update/', updateHotel);

hotelsRouter.get('/:id/delete/', deleteHotelForm);
hotelsRouter.post('/:id/delete/', deleteHotel);
