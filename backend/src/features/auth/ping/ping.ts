import { withJSON } from 'utils/withJSON/withJSON';
import { withAuth } from 'utils/withAuth/withAuth';

export const ping = withAuth()(() =>
  withJSON()(async () => {
    return { pong: true };
  }),
);
