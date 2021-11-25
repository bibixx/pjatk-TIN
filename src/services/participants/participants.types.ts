import { Participant } from 'types/tables';

export type NewParticipant = Omit<Participant, 'id'>;

export interface RenderableParticipant {
  id?: number;
  name?: string;
  surname?: string;
  dob?: string;
  email?: string;
  phonenumber?: string;
}

interface RenderableTrip {
  name: string;
}

export interface RenderableTripParticipant {
  id: number;
  trip: RenderableTrip;
  discount: number | undefined;
  dateofpayment: string | undefined;
}
