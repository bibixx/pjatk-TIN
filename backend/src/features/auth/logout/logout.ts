import { withJSON } from 'utils/withJSON/withJSON';
import { withAuth } from 'utils/withAuth/withAuth';
import { Request } from 'express';

const destroySession = (req: Request) =>
  new Promise((resolve) => req.session.destroy(resolve));

export const logout = withAuth(() =>
  withJSON()(async (_, req) => {
    await destroySession(req);

    return {};
  }),
);
