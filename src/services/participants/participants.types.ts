import { Participant } from 'types/tables';

export type NewParticipant = Omit<Participant, 'id'>;
