import { UserTable } from '@s19192/shared';
import { Request, Response } from 'express';
import { getUserById } from 'features/auth/auth.models';
import { getSessionElement } from 'utils/session/session';

export const withAuth =
  <T>(userConsumer: (user: UserTable) => (req: Request, res: Response) => T) =>
  async (req: Request, res: Response): Promise<T | undefined> => {
    const userId = getSessionElement(req, 'userId');

    if (userId === undefined) {
      res.status(403);
      res.json({ message: 'Not authenticated' });
      return undefined;
    }

    const user = await getUserById(userId);

    if (user === undefined) {
      res.status(403);
      res.json({ message: 'Not authenticated' });
      return undefined;
    }

    return userConsumer(user)(req, res);
  };
