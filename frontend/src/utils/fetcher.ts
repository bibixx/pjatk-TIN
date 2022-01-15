import { APIError } from './APIError';

export const fetcher = async <T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(input, init);
  const data = await response.json();

  if (!response.ok) {
    throw new APIError(data.details, response.status);
  }

  return data;
};
