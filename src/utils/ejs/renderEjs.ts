import { Response } from 'express';
import { ViewArguments, ViewNames, VIEW_PATHS } from './types';

export const renderEjs = <T extends ViewNames>(
  res: Response,
  viewName: T,
  data: ViewArguments[T],
) => {
  const path = VIEW_PATHS[viewName];

  res.render(path, data);
};
