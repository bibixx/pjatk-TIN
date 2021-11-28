export const formatPrice = (value: number) => {
  const thousands = Math.floor(value / 1000);
  const rest = value - thousands * 1000;

  if (thousands === 0) {
    return rest.toFixed(2).replace('.', ',');
  }

  const restAsString = rest
    .toFixed(2)
    .replace('.', ',')
    .padStart(3 + 1 + 2, '0');

  return `${thousands} ${restAsString}`;
};
