import { appRouter } from 'core/routes';
import { PORT } from 'core/env';
import { Logger } from 'core/logger';
import { app } from 'core/app';

app.use('/', appRouter);

app.listen(PORT, () => {
  Logger.info(`App is running at http://localhost:${PORT}`);
});
