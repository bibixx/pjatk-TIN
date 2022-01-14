import { ReplaceDateWithNumber } from "..";
import { ParticipantTable, TripParticipantTable, TripTable } from "./tables";

type TripParticipantPrePopulated = ReplaceDateWithNumber<TripParticipantTable>;

export type TripParticipantPopulated = TripParticipantPrePopulated & {
  trip: ReplaceDateWithNumber<TripTable>;
  participant: ReplaceDateWithNumber<ParticipantTable>;
};

export type NewTripParticipant = Omit<TripParticipantTable, 'id'>;
