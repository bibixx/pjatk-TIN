import { db } from 'core/db';
import { getParticipantById } from 'features/participants/participants.model';
import { getTripById } from 'features/trips/trips.model';

import {
  ParticipantTable,
  TripParticipantTable,
  TripTable,
} from 'types/tables';
import { TripParticipant } from './tripParticipants.types';

export const getAllTripParticipants = async (): Promise<TripParticipant[]> => {
  const tripParticipants = await db
    .from<TripParticipantTable>('tripparticipant')
    .select('*');

  const tripParticipantPromises = tripParticipants.map(
    async ({ idparticipant, idtrip, ...rest }): Promise<TripParticipant> => {
      // TODO: No as

      const participant = (await getParticipantById(
        idparticipant,
      )) as ParticipantTable;
      const trip = (await getTripById(idtrip)) as TripTable;

      return {
        ...rest,
        participant,
        trip,
      };
    },
  );

  return Promise.all(tripParticipantPromises);
};

export const getTripParticipantById = async (
  tripId: number,
): Promise<TripParticipant | undefined> => {
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

  const { idparticipant, idtrip, ...rest } = result;

  // TODO: No as
  const participant = (await getParticipantById(
    idparticipant,
  )) as ParticipantTable;
  const trip = (await getTripById(idtrip)) as TripTable;

  return {
    ...rest,
    participant,
    trip,
  };
};

export const getTripParticipantsByParticipantId = (participantId: number) => {
  return db
    .from<TripParticipantTable>('tripparticipant')
    .where({
      idparticipant: participantId,
    })
    .join('trip', 'trip.id', '=', 'tripparticipant.idtrip')
    .select<(TripParticipantTable & TripTable)[]>('*');
};

export const deleteTripParticipantByParticipantId = (participantId: number) => {
  return db.delete().from<TripParticipantTable>('tripparticipant').where({
    idparticipant: participantId,
  });
};
