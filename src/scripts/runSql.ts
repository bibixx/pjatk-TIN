import chalk from 'chalk';
import { db } from 'core/db';
import { readFile } from 'fs/promises';

const runSql = async (path?: string) => {
  if (!path) {
    throw new Error('No path provided');
  }

  const sqlFileContents = await readFile(path, { encoding: 'utf8' });

  await db.raw(sqlFileContents);

  console.log(chalk.green('DONE!'));

  db.destroy();
};

const path = process.argv[2];

runSql(path);
