import { db } from 'core/db';
import { ParticipantTable } from 'types/tables';
import { NewParticipant } from './participants.types';

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
