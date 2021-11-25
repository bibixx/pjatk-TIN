import { View, ViewArguments, ViewNames, VIEW_PATHS } from './types';

export const renderEjs = <T extends ViewNames>(
  viewName: T,
  data: ViewArguments[T],
): View<T> => {
  const path = VIEW_PATHS[viewName];

  return {
    path,
    data,
  };
};
