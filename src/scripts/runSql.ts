import chalk from 'chalk';
import { db } from 'core/db';
import { readFile } from 'fs/promises';
import dotenv from 'dotenv';

const runSql = async (path?: string) => {
  if (!path) {
    throw new Error('No path provided');
  }

  const sqlFileContents = await readFile(path, { encoding: 'utf8' });

  await db.raw(sqlFileContents);

  // eslint-disable-next-line no-console
  console.log(chalk.green('DONE!'));

  db.destroy();
};

dotenv.config();
const path = process.argv[2];
runSql(path);
