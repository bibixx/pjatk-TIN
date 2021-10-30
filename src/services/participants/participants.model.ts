import { db } from 'core/db';
import { Participant } from 'types/tables';
import { NewParticipant } from './participants.types';

export const getAllParticipants = () => {
  return db.select('*').from<Participant>('participant');
};

export const getParticipantById = (id: number) => {
  return db
    .select('*')
    .from<Participant>('participant')
    .where({
      id,
    })
    .first();
};

export const deleteParticipantById = (id: number) => {
  return db.delete().from<Participant>('participant').where({
    id,
  });
};

export const createParticipant = (participant: NewParticipant) => {
  return db<Participant>('participant').insert(participant, '*');
};

export const updateParticipant = (
  id: number,
  participant: Partial<NewParticipant>,
) => {
  return db<Participant>('participant').update(participant, '*').where({ id });
};
