const padStart = (value: number) => String(value).padStart(2, '0');

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = padStart(date.getMonth() + 1);
  const day = padStart(date.getDate());

  return `${year}-${month}-${day}`;
};
