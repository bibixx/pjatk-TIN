import {
  AdminUser,
  ParticipantUser,
  UserTable,
  UserType,
} from '@s19192/shared';
import { NextFunction, Request, Response } from 'express';
import { getUserById } from 'features/auth/auth.models';
import { getSessionElement } from 'utils/session/session';

export const isAdmin = (user: UserTable): user is AdminUser =>
  user.userType === 'admin';
export const isParticipant = (user: UserTable): user is ParticipantUser =>
  user.userType === 'participant';

export const withAuth =
  <T>(userGroups: UserType[] = []) =>
  (
    userConsumer: (
      user: UserTable,
    ) => (req: Request, res: Response, next: NextFunction) => T,
  ) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<T | undefined> => {
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

    const isUserInGroup = userGroups.some((group) => user.userType === group);

    if (userGroups.length > 0 && !isUserInGroup) {
      res.status(401);
      res.json({ message: 'Forbidden' });
      return undefined;
    }

    return userConsumer(user)(req, res, next);
  };
