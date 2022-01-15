import type { Request } from 'express';

interface CustomSessionFields {
  userId?: number;
}
type CustomSession = Request['session'] & CustomSessionFields;

export const getSessionElement = <Key extends keyof CustomSession>(
  req: Request,
  key: Key,
) => {
  return (req.session as CustomSession)[key];
};

export const setSessionElement = <Key extends keyof CustomSessionFields>(
  req: Request,
  key: Key,
  value: CustomSessionFields[Key],
) => {
  (req.session as CustomSessionFields)[key] = value;
};
