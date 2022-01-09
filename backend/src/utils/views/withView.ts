import { Request, Response } from 'express';
import { Logger } from 'core/logger';
import { renderEjs } from 'utils/ejs/renderEjs';
import { ViewNames } from 'utils/ejs/types';

export const withView =
  <Data>(viewFunction: (res: Response, data: Data) => void) =>
  (fn: (req: Request, res: Response) => Promise<Data>) =>
  async (req: Request, res: Response) => {
    try {
      const data = await fn(req, res);

      viewFunction(res, data);
    } catch (error) {
      Logger.error(error);

      renderEjs(res, ViewNames.ERROR, {}, 500);
    }
  };
