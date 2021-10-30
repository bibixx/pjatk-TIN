import { db } from 'core/db';

import { TripParticipant } from 'types/tables';

export const getTripParticipantByParticipantId = (participantId: number) => {
  return db
    .select('*')
    .from<TripParticipant>('tripparticipant')
    .where({
      idparticipant: participantId,
    })
    .first();
};
