export const parseDate = (dateString: string | undefined) => {
  if (dateString === undefined) {
    return undefined;
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date;
};
