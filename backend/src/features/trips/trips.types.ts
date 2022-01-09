import { TripTable } from 'types/tables';

export type NewTrip = Omit<TripTable, 'id'>;
