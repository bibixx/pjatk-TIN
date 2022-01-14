import {
  LoginRequestDTO,
  LoginResponseDTO,
  loginValidator,
} from '@s19192/shared';
import { APIError, withJSON } from 'utils/withJSON/withJSON';
import { compare } from 'bcrypt';
import { setSessionElement } from 'utils/session/session';
import { getUserByUsername } from '../auth.models';

export const login = withJSON<LoginResponseDTO, LoginRequestDTO>(
  loginValidator,
)(async ({ username, password }, req) => {
  const rawUser = await getUserByUsername(username);

  if (rawUser === undefined) {
    throw new APIError('Unauthorized', 401);
  }

  const { password: dbPassword, ...safeUser } = rawUser;

  const isPasswordCorrect = await compare(password, dbPassword);

  if (!isPasswordCorrect) {
    throw new APIError('Unauthorized', 401);
  }

  setSessionElement(req, 'userId', safeUser.id);

  return {
    user: safeUser,
  };
});
