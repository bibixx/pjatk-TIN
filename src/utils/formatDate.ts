const padStart = (value: number) => `00${value}`.slice(-2);
export const formatDate = (date: Date) =>
  `${date.getFullYear()}-${padStart(date.getMonth() + 1)}-${padStart(
    date.getDate(),
  )}`;
