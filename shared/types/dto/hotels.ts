import { NewHotel } from "../hotels";
import { HotelTable } from "../tables";

export interface CreateHotelResponseDTO {
  hotel: HotelTable
}
export type CreateHotelRequestDTO = NewHotel

export interface DeleteHotelResponseDTO {}

export interface GetHotelResponseDTO {
  hotel: HotelTable
}

export interface GetHotelsResponseDTO {
  hotels: HotelTable[]
}

export interface UpdateHotelResponseDTO {
  hotel: HotelTable
}
export type UpdateHotelRequestDTO = NewHotel
