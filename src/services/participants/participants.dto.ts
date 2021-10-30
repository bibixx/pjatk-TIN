import { Participant } from 'types/tables';
import { NewParticipant } from './participants.types';

export interface GetParticipantsDTO {
  participants: Participant[];
}

export interface GetParticipantByIdDTO {
  participant: Participant;
}

export interface DeleteParticipantByIdDTO {}

export interface CreateParticipantRequestDTO {
  participant: NewParticipant;
}

export interface CreateParticipantResponseDTO {
  participant: Participant;
}

export interface UpdateParticipantRequestDTO {
  participant: Partial<NewParticipant>;
}

export interface UpdateParticipantResponseDTO {
  participant: Participant;
}
