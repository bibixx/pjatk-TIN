import { Response } from 'express';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewNames } from 'utils/ejs/types';
import { withView } from 'utils/views/withView';

const homeView = (res: Response) => {
  return renderEjs(res, ViewNames.HOME, {});
};

export const home = withView(homeView)(async () => {});
