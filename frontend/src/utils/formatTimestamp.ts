export const formatTimestamp = (timestamp: number | null) => {
  if (timestamp === null) {
    return undefined;
  }

  const date = new Date(timestamp);
  if (Number.isNaN(date.valueOf())) {
    return undefined;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
