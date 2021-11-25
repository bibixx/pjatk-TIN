import { Request, Response } from 'express';
import { renderEjs } from './renderEjs';

type ControllerResponseType = ReturnType<typeof renderEjs>;

export const withEjsResponse =
  (
    fn: (
      req: Request,
      res: Response,
    ) => Promise<ControllerResponseType | undefined>,
  ) =>
  async (req: Request, res: Response) => {
    const result = await fn(req, res);
    if (result === undefined) {
      return;
    }

    const { path, data } = result;

    res.render(path, data);
  };
