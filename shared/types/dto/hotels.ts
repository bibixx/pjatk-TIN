import { Infer } from "typed";
import { hotelValidator } from "../..";
import { HotelTable } from "../tables";

export interface CreateHotelResponseDTO {
  hotel: HotelTable
}
export type CreateHotelRequestDTO = Infer<typeof hotelValidator>

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
export type UpdateHotelRequestDTO = Infer<typeof hotelValidator>
