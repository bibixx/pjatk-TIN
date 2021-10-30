import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { appRouter } from 'core/routes';
import { PORT } from 'core/env';
import { Logger } from 'core/logger';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', appRouter);

app.listen(PORT, () => {
  Logger.info(`App is running at http://localhost:${PORT}`);
});
