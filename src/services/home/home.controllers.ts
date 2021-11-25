import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewNames } from 'utils/ejs/types';
import { withEjsResponse } from 'utils/ejs/withEjsResponse';

export const getHome = withEjsResponse(async () =>
  renderEjs(ViewNames.HOME, {}),
);
