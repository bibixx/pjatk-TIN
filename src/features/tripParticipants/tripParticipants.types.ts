import { RenderableParticipant } from 'features/participants/participants.types';
import { ParticipantTable, TripTable } from 'types/tables';

export interface TripParticipant {
  id: number;
  trip: TripTable;
  participant: ParticipantTable;
  discount: number | null;
  dateofpayment: Date | null;
}

export interface RenderableTripParticipant {
  id: number;
  trip: TripTable;
  participant: RenderableParticipant;
  discount: number | undefined;
  dateofpayment: string | undefined;
}
