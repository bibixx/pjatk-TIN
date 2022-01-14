import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import redis from 'redis';
import createRedisStore from 'connect-redis';
import { SESSION_SECRET } from './env';

const RedisStore = createRedisStore(session);
const redisClient = redis.createClient({ host: 'redis' });

export const app = express();

app.use(express.static(path.join(__dirname, '../static')));
app.enable('strict routing');

app.use(morgan('dev'));

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      sameSite: true,
      httpOnly: true,
    },
  }),
);
app.use(bodyParser.json({}));
