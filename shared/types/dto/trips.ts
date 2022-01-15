import { TripTable } from "../tables";
import { ReplaceDateWithNumber } from "../ReplaceDateWithNumber";
import { tripValidator } from "../..";
import { Infer } from "typed";

export interface CreateTripResponseDTO {
  trip: ReplaceDateWithNumber<TripTable>
}
export type CreateTripRequestDTO = Infer<typeof tripValidator>

export interface DeleteTripResponseDTO {}

export interface GetTripResponseDTO {
  trip: ReplaceDateWithNumber<TripTable>
}

export interface GetTripsResponseDTO {
  trips: ReplaceDateWithNumber<TripTable>[]
}

export interface UpdateTripResponseDTO {
  trip: ReplaceDateWithNumber<TripTable>
}
export type UpdateTripRequestDTO = Infer<typeof tripValidator>
