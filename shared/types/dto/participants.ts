import { TripParticipantPopulated } from "../tripParticipant";
import { ParticipantTable } from "../tables";
import { ReplaceDateWithNumber } from "../ReplaceDateWithNumber";

export type NewParticipant = Omit<ParticipantTable, 'id'>;

export type CreateParticipantRequestDTO = NewParticipant

export interface CreateParticipantResponseDTO {
  participant: ReplaceDateWithNumber<ParticipantTable>;
}

export interface DeleteParticipantResponseDTO {}

export interface GetParticipantResponseDTO {
  participant: ReplaceDateWithNumber<ParticipantTable>;
}

export interface GetParticipantsResponseDTO {
  participants: ReplaceDateWithNumber<ParticipantTable>[];
}

export type UpdateParticipantRequestDTO = NewParticipant

export interface UpdateParticipantResponseDTO {
  participant: ReplaceDateWithNumber<ParticipantTable>;
}
