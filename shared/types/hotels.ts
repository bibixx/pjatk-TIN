import { HotelTable } from "./tables";

export type NewHotel = Omit<HotelTable, 'id'>;
