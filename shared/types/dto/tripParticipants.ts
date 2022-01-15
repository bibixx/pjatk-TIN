import { NewTripParticipant, TripParticipantPopulated } from "../tripParticipant";
import { TripParticipantTable } from "../tables";
import { ReplaceDateWithNumber } from "../ReplaceDateWithNumber";
import { tripParticipantValidator } from "../..";
import { Infer } from "typed";

export interface UpdateTripParticipantResponseDTO {
  tripParticipant: ReplaceDateWithNumber<TripParticipantTable>,
}
export type UpdateTripParticipantRequestDTO = Infer<typeof tripParticipantValidator>

export interface CreateTripParticipantResponseDTO {
  tripParticipant: ReplaceDateWithNumber<TripParticipantTable>,
}
export type CreateTripParticipantRequestDTO = Infer<typeof tripParticipantValidator>

export interface DeleteTripParticipantRequestDTO {}

export interface GetTripParticipantResponseDTO {
  tripParticipant: TripParticipantPopulated,
}

export interface GetTripParticipantsResponseDTO {
  tripParticipants: TripParticipantPopulated[],
}
