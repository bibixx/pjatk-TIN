import { viewsPath } from 'core/app';

export const root = (path: string) =>
  `${viewsPath}/${path.replace(/^\/+/, '')}`;
