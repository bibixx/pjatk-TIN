import { ParticipantTable } from 'types/tables';

export type NewParticipant = Omit<ParticipantTable, 'id'>;

export interface RenderableParticipant {
  id?: number;
  name?: string;
  surname?: string;
  dob?: string;
  email?: string;
  phonenumber?: string;
}

export interface RenderableParticipantTripParticipant {
  id: number;
  trip: {
    name: string;
  };
  discount: number | undefined;
  dateofpayment: string | undefined;
}
