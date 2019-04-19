const { createLogger, format, transports } = require('winston');
const getNamespace = require('cls-hooked').getNamespace;

const myFormat = format.printf(({level, message, timestamp}) => {
  const loggerNamespace = getNamespace('logger');
  return `[${timestamp}] [${level}] [${loggerNamespace.get('correlationId')}]: ${message}`;
});

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.splat(),
    myFormat
  ),
  transports: [
    new transports.Console()
  ],
});

module.exports = logger;
