const winston = require('winston');
require('winston-daily-rotate-file');

module.exports = {
  init: init
};

function init(app) {
  app.use((req, res, next) => {
    var transport = new (winston.transports.DailyRotateFile)({
      filename: 'logs/eternus-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      prepend: true
    });
    // Log request data and register event to log response.
    var logger = req.logger = logger = new(winston.createLogger)({
      transports: [
        new(winston.transports.Console)({
          prettyPrint: true
        }),
        // new (winston.transports.File)({ filename: 'somefile.log' }) // TODO: Read this from config.
        transport
      ]
    });

    winston.addColors({
      silly: 'magenta',
      debug: 'cyan',
      info: 'green',
      warn: 'yellow',
      error: 'red'
    });

    logger.info({
      requestStarted: {
        method: req.method,
        url: req.url,
        headers: req.headers,
        query: req.query,
        body: req.body
      }
    });
    res.on('close', function () {
      logger.info({
        requestTerminated: {
          method: req.method,
          url: req.url,
          headers: req.headers,
          query: req.query
        }
      });
    });
    res.on('finish', function () {
      logger.info({
        requestFinished: {
          statusCode: res.statusCode,
          method: req.method,
          url: req.url,
          headers: req.headers,
          query: req.query
        }
      });
    });
    next();
  });
}
