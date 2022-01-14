export const makeRequest = async <T, U = void>(
  endpoint: string,
  method: 'PUT' | 'POST' | 'DELETE',
  data?: T,
): Promise<U> => {
  const response = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(data
      ? {
          body: JSON.stringify(data),
        }
      : {}),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  return response.json();
};
