import { ReplaceDateWithNumber } from "..";
import { ParticipantTable, TripParticipantTable, TripTable } from "./tables";

type TripParticipantPrePopulated = ReplaceDateWithNumber<Omit<
  Omit<TripParticipantTable, 'idtrip'>,
  'idparticipant'
>>;

export type TripParticipantPopulated = TripParticipantPrePopulated & {
  trip: ReplaceDateWithNumber<TripTable>;
  participant: ReplaceDateWithNumber<ParticipantTable>;
};

export type NewTripParticipant = Omit<TripParticipantTable, 'id'>;
