import path from 'path';
import * as dotenv from 'dotenv';

const dotEnvPath = path.join(__dirname, '../../.env');
dotenv.config({ path: dotEnvPath });

export const { PG_CONNECTION_STRING, PORT } = process.env;
