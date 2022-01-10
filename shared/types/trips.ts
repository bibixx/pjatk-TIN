import { TripTable } from "./tables";

export type NewTrip = Omit<TripTable, 'id'>;
