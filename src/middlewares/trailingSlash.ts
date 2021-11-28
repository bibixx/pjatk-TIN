import { NextFunction, Request, Response } from 'express';

export const trailingSlash = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { path } = req;
  const query = req.url.slice(path.length);

  if (path.endsWith('/')) {
    next();
    return;
  }

  res.redirect(`${path}/${query}`);
};
