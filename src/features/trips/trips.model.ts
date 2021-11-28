import { db } from 'core/db';
import { TripTable } from 'types/tables';

export const getTripById = (id: number) => {
  return db
    .from<TripTable>('trip')
    .select('*')
    .where({
      id,
    })
    .first();
};

export const getTripsByHotelId = (hotelId: number) => {
  return db.from<TripTable>('trip').select('*').where({ idhotel: hotelId });
};
