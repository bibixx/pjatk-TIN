import {
  ParticipantTable,
  RegisterRequestDTO,
  RegisterResponseDTO,
  registerValidator,
  UserTable,
} from '@s19192/shared';
import { APIError, withJSON } from 'utils/withJSON/withJSON';
import { hash } from 'bcrypt';
import { setSessionElement } from 'utils/session/session';
import { createParticipant } from 'features/participants/participants.model';
import { db } from 'core/db';
import { createUser, getUserByUsername } from '../auth.models';

export const register = withJSON<RegisterResponseDTO, RegisterRequestDTO>(
  registerValidator,
)(
  async (
    { username, password, name, surname, dob, email, phonenumber },
    req,
  ) => {
    const rawUser = await getUserByUsername(username);

    if (rawUser !== undefined) {
      throw new APIError('User already exists', 422);
    }

    const newRawUser = await db.transaction(async (trx) => {
      const [newParticipant] = await createParticipant({
        name,
        surname,
        dob,
        email,
        phonenumber,
      }).transacting(trx);

      const hashedPassword = await hash(password, 10);
      const createdUsers = await createUser({
        username,
        password: hashedPassword,
        userType: 'participant',
        idparticipant: (newParticipant as ParticipantTable).id,
      }).transacting(trx);

      return createdUsers[0] as UserTable;
    });

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { password: _password, ...safeUser } = newRawUser;

    setSessionElement(req, 'userId', safeUser.id);

    return {
      user: safeUser,
    };
  },
);
