'use strict';

const AppError = require('../lib/app_error');
const errorCodes = require('../lib/error_codes.json');
let _ = require('lodash');

module.exports = {
  init: init
};

/*
 * make sure this is the last middleware called since it sets up the 404 NOT FOUND, which needs to be the last handler.
 */
function init(app) {

  // Error handler
  app.use((err, req, res, next) => {

    let defaultStatusCode = 500;
    try {
      req.logger.error({
        error: 'request_error',
        request: {
          method: req.method,
          url: req.url,
          headers: req.headers,
          body: req.body
        },
        __inner: err
      });
      _formatSwaggerError(err);
      console.log('err---',err)
      if (err instanceof AppError) {
        let appError = err.message;
        if (errorCodes.customErrorCodes.hasOwnProperty(appError.error)) {
          let customError = errorCodes.customErrorCodes[appError.error];
          res.status(customError.statusCode)
            .json({error: appError.error, message: appError.message})
        }
      } else if(res.statusCode && res.statusCode !== 200) {
        res.status(res.statusCode)
          .json({error: errorCodes.httpStatusCodes[res.statusCode].status,
            message: errorCodes.httpStatusCodes[res.statusCode].message
        })
      } else {
        res.status(defaultStatusCode)
          .json({error: errorCodes.httpStatusCodes[defaultStatusCode].status,
            message: errorCodes.httpStatusCodes[defaultStatusCode].message
          })
      }
    } catch (e) {
      res.status(defaultStatusCode)
        .json({error: errorCodes.httpStatusCodes[defaultStatusCode].status,
          message: errorCodes.httpStatusCodes[defaultStatusCode].message
        })
    }
  });
}

function _formatSwaggerError(err) {
  if (err.failedValidation && err.originalResponse) {
    var originalResponse = (err.originalResponse instanceof Buffer ? err.originalResponse : new Buffer(err.originalResponse.data)).toString('utf8');
    try {
      err.originalResponse = JSON.parse(originalResponse);
    } catch (e) {
      err.originalResponse = originalResponse;
    }
  }
}
