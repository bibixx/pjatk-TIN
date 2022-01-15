import { UserTable } from '@s19192/shared';
import { db } from 'core/db';

export const getUserById = (id: number) => {
  return db
    .select('*')
    .from<UserTable>('user')
    .where({
      id,
    })
    .first();
};

export const getUserByUsername = (username: string) => {
  return db
    .select('*')
    .from<UserTable>('user')
    .where({
      username,
    })
    .first();
};

export const createUser = (user: Omit<UserTable, 'id'>) => {
  return db<UserTable>('user').insert(user as UserTable, '*');
};

export const deleteUserByParticipantId = (participantId: number) => {
  return db.delete().from<UserTable>('user').where({
    idparticipant: participantId,
  });
};
