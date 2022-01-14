import { NotFound } from 'components/NotFound/NotFound';
import { UnexpectedError } from 'components/UnexpectedError/UnexpectedError';
import { APIError } from 'utils/ApiError';

interface Props extends React.ComponentProps<typeof NotFound> {
  errors: (APIError | undefined)[];
}

export const EntityError = ({ errors, page }: Props) => {
  const areAll404 = errors.every((error) =>
    error === undefined ? true : error.status === 404,
  );

  if (areAll404) {
    return <NotFound page={page} />;
  }

  return <UnexpectedError />;
};
