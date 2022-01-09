import { Response } from 'express';
import { templateUtils } from './templateUtils';
import { ViewArguments, ViewNames, VIEW_PATHS } from './types';

export const renderEjs = <T extends ViewNames>(
  res: Response,
  viewName: T,
  data: ViewArguments[T],
  status: number = 200,
) => {
  const path = VIEW_PATHS[viewName];

  res.status(status).render(path, {
    ...data,
    utils: templateUtils,
  });
};
