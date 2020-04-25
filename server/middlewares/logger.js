let _ = require("lodash");
let Logger = require("../shared/logger").loggerInstance;

module.exports = {
  init: init,
};

function init(app) {
  app.use((req, res, next) => {
    try {
      // logger = Logger(app.config.logger, app.config.debug);
      req.logger = Logger(app.config.logger, app.config.debug);
      // // To find request ip address
      let ipAddress = (req.headers["x-request-ip"] =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress ||
        "");
      let ipAddresArray = _.split(ipAddress, ":");
      // Add ip address to request
      req.requestIP =
        ipAddresArray.length > 1 ? ipAddresArray[2] : ipAddresArray[0];

      // TODO: Testing
      // logger.info({
      //   requestStarted: {
      //     method: req.method,
      //     url: req.url,
      //     headers: req.headers,
      //     query: req.query,
      //     body: req.body,
      //   },
      // });
    } catch (e) {
      next(e);
    }
    next();
  });
}
