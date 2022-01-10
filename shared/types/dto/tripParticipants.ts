import { NewTripParticipant, TripParticipantPopulated } from "../tripParticipant";
import { TripParticipantTable } from "../tables";
import { ReplaceDateWithNumber } from "../ReplaceDateWithNumber";

export interface UpdateTripParticipantResponseDTO {
  tripParticipant: ReplaceDateWithNumber<TripParticipantTable>,
}
export type UpdateTripParticipantRequestDTO = NewTripParticipant

export interface CreateTripParticipantResponseDTO {
  tripParticipant: ReplaceDateWithNumber<TripParticipantTable>,
}
export type CreateTripParticipantRequestDTO = NewTripParticipant

export interface DeleteTripParticipantRequestDTO {}

export interface GetTripParticipantResponseDTO {
  tripParticipant: TripParticipantPopulated,
}

export interface GetTripParticipantsResponseDTO {
  tripParticipants: TripParticipantPopulated[],
}
