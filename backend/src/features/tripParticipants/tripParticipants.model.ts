import { db } from 'core/db';
import { getParticipantById } from 'features/participants/participants.model';
import { getTripById } from 'features/trips/trips.model';

import {
  ParticipantTable,
  TripParticipantTable,
  TripTable,
  TripParticipantPopulated,
  NewTripParticipant,
} from '@s19192/shared';
import { replaceDateWithTimestamp } from 'utils/replaceDateWithString';

const fetchParticipantsForTrip = async ({
  idparticipant,
  idtrip,
  ...rest
}: TripParticipantTable): Promise<TripParticipantPopulated> => {
  const participant = await getParticipantById(idparticipant);
  const trip = await getTripById(idtrip);

  return {
    ...replaceDateWithTimestamp(rest),
    idparticipant,
    idtrip,
    trip: replaceDateWithTimestamp(trip as TripTable),
    participant: replaceDateWithTimestamp(participant as ParticipantTable),
  };
};

export const getAllTripParticipants = async ({
  participantId,
}: {
  participantId?: number;
}): Promise<TripParticipantPopulated[]> => {
  const tripParticipantsQuery = db
    .from<TripParticipantTable>('tripparticipant')
    .orderBy('id')
    .select('*');

  const tripParticipantsQueryWithWhereApplied =
    participantId === undefined
      ? tripParticipantsQuery
      : tripParticipantsQuery.where({ idparticipant: participantId });

  const tripParticipants = await tripParticipantsQueryWithWhereApplied;

  const tripParticipantPromises = tripParticipants.map(
    fetchParticipantsForTrip,
  );

  return Promise.all(tripParticipantPromises);
};

export const getTripParticipantById = async (
  tripId: number,
): Promise<TripParticipantPopulated | undefined> => {
  const result = await db
    .where({
      id: tripId,
    })
    .from<TripParticipantTable>('tripparticipant')
    .select('*')
    .first();

  if (result === undefined) {
    return undefined;
  }

  return fetchParticipantsForTrip(result);
};

export const getTripParticipantsByParticipantId = async (
  participantId: number,
) => {
  const result = await db
    .from<TripParticipantTable>('tripparticipant')
    .where({
      idparticipant: participantId,
    })
    .select('*');

  return Promise.all(result.map(fetchParticipantsForTrip));
};

export const deleteTripParticipantsByParticipantId = (
  participantId: number,
) => {
  return db
    .from<TripParticipantTable>('tripparticipant')
    .where({
      idparticipant: participantId,
    })
    .delete();
};

export const getTripParticipantsByTripId = async (tripId: number) => {
  const tripParticipants = await db
    .from<TripParticipantTable>('tripparticipant')
    .where({
      idtrip: tripId,
    })
    .select('*');

  const tripParticipantPromises = tripParticipants.map(
    fetchParticipantsForTrip,
  );

  return Promise.all(tripParticipantPromises);
};

export const deleteTripParticipantsByTripId = (tripId: number) => {
  return db
    .from<TripParticipantTable>('tripparticipant')
    .where({
      idtrip: tripId,
    })
    .delete();
};

export const createTripParticipant = (tripParticipant: NewTripParticipant) => {
  return db<TripParticipantTable>('tripparticipant').insert(
    tripParticipant,
    '*',
  );
};

export const updateTripParticipant = (
  tripParticipantId: number,
  tripParticipant: Partial<NewTripParticipant>,
) => {
  return db<TripParticipantTable>('tripparticipant')
    .update(tripParticipant, '*')
    .where({ id: tripParticipantId });
};

export const deleteTripParticipant = (tripParticipantId: number) => {
  return db<TripParticipantTable>('tripparticipant')
    .where({ id: tripParticipantId })
    .delete();
};
