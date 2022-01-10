export const makeRequest = (
  endpoint: string,
  method: 'PUT' | 'POST' | 'DELETE',
  data?: any = {},
) =>
  fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
