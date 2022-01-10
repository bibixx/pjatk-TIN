import { Request, Response } from 'express';
import { Logger } from 'core/logger';
import { Typed } from 'typed';

export class APIError extends Error {
  constructor(message?: string, public status = 400, public details?: object) {
    super(message);
    const trueProto = new.target.prototype;

    Object.setPrototypeOf(this, trueProto);
  }
}

export const withJSON =
  <ResponseDTO, RequestDTO = null>(
    ...rest: RequestDTO extends null ? [undefined?] : [Typed<RequestDTO>]
  ) =>
  (
    controller: (
      data: RequestDTO,
      req: Request,
      res: Response,
    ) => Promise<ResponseDTO>,
  ) =>
  async (req: Request, res: Response) => {
    const [validator] = rest;

    try {
      const { body } = req;

      if (validator === undefined) {
        const responseData = await controller(null as any, req, res);

        return res.json(responseData);
      }

      const validationResult = validator(body);

      if (!validationResult.success) {
        throw new APIError('Invalid body', 422, validationResult.errors);
      }

      const data = validationResult.value;
      const responseData = await controller(data, req, res);

      return res.json(responseData);
    } catch (error) {
      if (error instanceof APIError) {
        res.status(error.status);
        return res.json({
          message: error.message,
          details: error.details,
        });
      }

      Logger.error(error);

      res.status(500);
      return res.json({
        error: true,
      });
    }
  };
