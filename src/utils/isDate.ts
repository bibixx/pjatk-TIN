export const isDateString = (dateString: string) => {
  const date = new Date(dateString);

  return !Number.isNaN(date.valueOf());
};
