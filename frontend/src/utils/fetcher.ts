export const fetcher = <T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> => fetch(input, init).then((res) => res.json());
