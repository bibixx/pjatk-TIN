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

export const createUser = (
  username: string,
  hashedPassword: string,
  userType: 'admin' | 'participant',
  participantId: number | null,
) => {
  return db<UserTable>('user').insert(
    {
      username,
      password: hashedPassword,
      userType,
      // TODO: Remove as any
      idparticipant: participantId as any,
    },
    '*',
  );
};
