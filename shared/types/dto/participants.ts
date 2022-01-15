import { ParticipantTable } from "../tables";
import { ReplaceDateWithNumber } from "../ReplaceDateWithNumber";
import { Infer } from "typed";
import { participantValidator } from "../..";

export type NewParticipant = Omit<ParticipantTable, 'id'>;

export type CreateParticipantRequestDTO = Infer<typeof participantValidator>

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

export type UpdateParticipantRequestDTO = Infer<typeof participantValidator>

export interface UpdateParticipantResponseDTO {
  participant: ReplaceDateWithNumber<ParticipantTable>;
}
