import { ParticipantTable } from 'types/tables';

export type NewParticipant = Omit<ParticipantTable, 'id'>;
