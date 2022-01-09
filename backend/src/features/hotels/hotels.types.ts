import { HotelTable } from 'types/tables';

export type NewHotel = Omit<HotelTable, 'id'>;
