import { UserType } from '@s19192/shared';
import { withAuth } from 'utils/withAuth/withAuth';

export const useAuth = (userGroups?: UserType[]) =>
  withAuth(userGroups)(() => (_req, _res, next) => next());
