import { NewTrip } from "../trips";
import { TripTable } from "../tables";
import { ReplaceDateWithNumber } from "../ReplaceDateWithNumber";

export interface CreateTripResponseDTO {
  trip: ReplaceDateWithNumber<TripTable>
}
export type CreateTripRequestDTO = NewTrip

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
export type UpdateTripRequestDTO = NewTrip
