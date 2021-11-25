import { Err } from 'typed';

export const errorsFromEntries = (errors: Err[]) => {
  return Object.fromEntries(
    errors.map(({ path, message }) => [path[0], message]),
  );
};
