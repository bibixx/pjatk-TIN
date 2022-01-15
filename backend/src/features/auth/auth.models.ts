import { UserTable, UserType } from '@s19192/shared';
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
  userType: UserType,
  participantId: number | null,
) => {
  return db<UserTable>('user').insert(
    {
      username,
      password: hashedPassword,
      userType: userType as any,
      idparticipant: participantId as any,
    },
    '*',
  );
};

export const deleteUserByParticipantId = (participantId: number) => {
  return db.delete().from<UserTable>('user').where({
    idparticipant: participantId,
  });
};
