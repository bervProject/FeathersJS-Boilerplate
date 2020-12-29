import { createLogger, format, transports } from 'winston';
import { getNamespace } from 'cls-hooked';

const myFormat = format.printf(({ level, message, timestamp }) => {
  const loggerNamespace = getNamespace('logger');
  let correlationId = loggerNamespace
    ? loggerNamespace.get('correlationId')
    : '';
  correlationId = correlationId ? correlationId : '';
  return `[${timestamp}] [${level}] [${correlationId}]: ${message}`;
});

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(format.timestamp(), format.splat(), myFormat),
  transports: [new transports.Console()],
});

export default logger;
