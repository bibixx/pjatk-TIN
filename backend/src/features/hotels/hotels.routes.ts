import express from 'express';
import { useAuth } from 'middlewares/useAuth/useAuth';
import { createHotel } from './createHotel/createHotel';
import { deleteHotel } from './deleteHotel/deleteHotel';
import { getHotel } from './getHotel/getHotel';
import { getHotels } from './getHotels/getHotels';
import { updateHotel } from './updateHotel/updateHotel';

export const hotelsRouter = express.Router();

hotelsRouter.get('/', getHotels);
hotelsRouter.get('/:id/', getHotel);

hotelsRouter.use(useAuth(['admin']));
hotelsRouter.post('/', createHotel);
hotelsRouter.put('/:id/', updateHotel);
hotelsRouter.delete('/:id/', deleteHotel);
