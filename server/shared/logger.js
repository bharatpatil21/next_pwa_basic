let winston = require('winston');
require('winston-daily-rotate-file');

module.exports = {
  loggerInstance: loggerInstance
};

function loggerInstance(config, debug = false) {
  let fileTransport = new winston.transports.DailyRotateFile({
    filename: config.dir + '/eternus-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    prepend: true,
    handleExceptions: true
  });

  let logTransports = [ fileTransport ];
  if (debug) {
    let consoleTransport = new(winston.transports.Console)({
      prettyPrint: true,
      handleExceptions: true,
      level: 'debug',
      colorize: true
    });
    logTransports.push(consoleTransport);
  }

  let logger = new(winston.createLogger)({
    level: 'debug', //TODO
    transports: logTransports,
    exitOnError: false
  });
  winston.addColors({
    silly: 'magenta',
    debug: 'cyan',
    info: 'green',
    warn: 'yellow',
    error: 'red'
  });

  return logger;
}
