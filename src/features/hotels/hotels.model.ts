import { db } from 'core/db';
import { HotelTable } from 'types/tables';
import { NewHotel } from './hotels.types';

export const getAllHotels = () => {
  return db.select('*').from<HotelTable>('hotel').orderBy('id');
};

export const getHotelById = (hotelId: number) => {
  return db
    .select('*')
    .from<HotelTable>('hotel')
    .where({
      id: hotelId,
    })
    .first();
};

export const createHotel = (hotel: NewHotel) => {
  return db<HotelTable>('hotel').insert(hotel, '*');
};

export const deleteHotel = (hotelId: number) => {
  return db<HotelTable>('hotel')
    .where({
      id: hotelId,
    })
    .delete();
};

export const updateHotel = (hotelId: number, hotel: Partial<NewHotel>) => {
  return db<HotelTable>('hotel').update(hotel).where({ id: hotelId });
};
