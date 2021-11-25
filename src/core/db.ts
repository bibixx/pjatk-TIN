import knex from 'knex';
import { PG_CONNECTION_STRING } from './env';

export const db = knex({
  client: 'pg',
  connection: PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});
