import chalk from 'chalk';

const getTime = (date: Date) => {
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

const getHeader = (header: string, color: (text: string) => string) => {
  const firstParen = chalk.white('[');
  const secondParen = chalk.white(']');

  const time = getTime(new Date());

  return `${firstParen}${color(header)}${secondParen} ${chalk.gray.bold(time)}`;
};

const error = (...text: any[]) => {
  const colorFunction = chalk.red;

  // eslint-disable-next-line no-console
  console.error(getHeader('ERROR', colorFunction), colorFunction(...text));
};

const info = (...text: any[]) => {
  const colorFunction = chalk.cyan;

  // eslint-disable-next-line no-console
  console.log(getHeader('INFO', colorFunction), colorFunction(...text));
};

export const Logger = {
  error,
  info,
};
