import { db } from 'core/db';
import { NewParticipant, ParticipantTable } from '@s19192/shared';

export const getAllParticipants = () => {
  return db.select('*').from<ParticipantTable>('participant').orderBy('id');
};

export const getParticipantById = (id: number) => {
  return db
    .select('*')
    .from<ParticipantTable>('participant')
    .where({
      id,
    })
    .first();
};

export const deleteParticipantById = (id: number) => {
  return db.delete().from<ParticipantTable>('participant').where({
    id,
  });
};

export const createParticipant = (participant: NewParticipant) => {
  return db<ParticipantTable>('participant').insert(participant, '*');
};

export const updateParticipant = (
  id: number,
  participant: Partial<NewParticipant>,
) => {
  return db<ParticipantTable>('participant')
    .update(participant, '*')
    .where({ id });
};
