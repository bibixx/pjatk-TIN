export const getNumericId = (id: unknown) => {
  if (typeof id !== 'string') {
    return null;
  }

  const parsedNumber = Number.parseInt(id, 10);

  if (Number.isNaN(parsedNumber)) {
    return null;
  }

  return parsedNumber;
};
