import { db } from 'core/db';
import { NewTrip, TripTable } from '@s19192/shared';

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

export const getAllTrips = () => {
  return db.select('*').from<TripTable>('trip').orderBy('id');
};

export const createTrip = (trip: NewTrip) => {
  return db<TripTable>('trip').insert(trip, '*');
};

export const updateTrip = (tripId: number, trip: Partial<NewTrip>) => {
  return db<TripTable>('trip').where({ id: tripId }).update(trip, '*');
};

export const deleteTrip = (tripId: number) => {
  return db<TripTable>('trip')
    .where({
      id: tripId,
    })
    .delete();
};
