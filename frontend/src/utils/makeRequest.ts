import { APIError } from './APIError';

export const makeRequest = async <T, U = void>(
  endpoint: string,
  method: 'PUT' | 'POST' | 'DELETE',
  body?: T,
): Promise<U> => {
  const response = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body
      ? {
          body: JSON.stringify(body),
        }
      : {}),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new APIError(data.message, response.status);
  }

  return data;
};
