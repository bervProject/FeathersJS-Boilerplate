/* eslint-disable no-console */
import logger from './logger';
import app from './app';

const port = app.get('port');
const task = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason),
);

task.then((server) => {
  logger.info(
    'Feathers application started on http://%s:%d',
    app.get('host'),
    port,
  );
});
