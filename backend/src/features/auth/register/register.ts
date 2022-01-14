import {
  loginValidator,
  RegisterRequestDTO,
  RegisterResponseDTO,
  UserTable,
} from '@s19192/shared';
import { APIError, withJSON } from 'utils/withJSON/withJSON';
import { hash } from 'bcrypt';
import { setSessionElement } from 'utils/session/session';
import { createUser, getUserByUsername } from '../auth.models';

export const register = withJSON<RegisterResponseDTO, RegisterRequestDTO>(
  loginValidator,
)(async ({ username, password }, req) => {
  const rawUser = await getUserByUsername(username);

  if (rawUser !== undefined) {
    throw new APIError('User already exists', 422);
  }

  const hashedPassword = await hash(password, 10);
  const [newRawUser] = await createUser(
    username,
    hashedPassword,
    'admin',
    null,
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { password: _password, ...newUser } = newRawUser as UserTable;

  setSessionElement(req, 'userId', newUser.id);

  return {
    user: newUser,
  };
});
