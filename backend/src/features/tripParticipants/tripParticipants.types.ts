import {
  ParticipantTable,
  TripParticipantTable,
  TripTable,
} from 'types/tables';

type TripParticipantPrePopulated = Omit<
  Omit<TripParticipantTable, 'idtrip'>,
  'idparticipant'
>;

export type TripParticipantPopulated = TripParticipantPrePopulated & {
  trip: TripTable;
  participant: ParticipantTable;
};

export type NewTripParticipant = Omit<TripParticipantTable, 'id'>;
