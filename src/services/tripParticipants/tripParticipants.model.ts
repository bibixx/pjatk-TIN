import { db } from 'core/db';

import { Trip, TripParticipant } from 'types/tables';

export const getTripParticipantsByParticipantId = (participantId: number) => {
  return db
    .from<TripParticipant>('tripparticipant')
    .where({
      idparticipant: participantId,
    })
    .join('trip', 'trip.id', '=', 'tripparticipant.idtrip')
    .select<(TripParticipant & Trip)[]>('*');
};

export const deleteTripParticipantByParticipantId = (participantId: number) => {
  return db.delete().from<TripParticipant>('tripparticipant').where({
    idparticipant: participantId,
  });
};
