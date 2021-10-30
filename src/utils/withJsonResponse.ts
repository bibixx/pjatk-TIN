import { Logger } from 'core/logger';
import { Request, Response } from 'express';

export class APIError extends Error {
  public key = APIError;

  constructor(public status: number, message?: string) {
    super(message);

    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export const withJsonResponse =
  <T>(fn: (req: Request) => Promise<T>) =>
  async (req: Request, res: Response) => {
    try {
      const response = await fn(req);

      return res.json(response);
    } catch (error) {
      if (error instanceof APIError) {
        return res.status(error.status).json({ error: error.message });
      }

      if (error instanceof Error) {
        Logger.error(error.stack);
      } else {
        Logger.error(error);
      }

      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  };
