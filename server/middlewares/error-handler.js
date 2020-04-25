let _ = require("lodash");
let CustomError = require("../lib/app_error");
const errorCodes = require('../lib/error_codes.json');

module.exports = {
  init: init,
};

function init(app) {
  // 404 error
  // app.use((req, res, next) => {
  //   res.boom.notFound("Not found.");
  // });

  app.use((err, req, res, next) => {
    console.log('ERROR----',err)
    if (req.query.i_error_trace) {
      res.boom.badRequest("Debug", { info: convertErrorToJSON(err) });
    } else {
      try {
        _formatSwaggerError(err);

        //log error
        _logError(req, err);

        if (err instanceof CustomError && err.hasOwnProperty('custom_error')
            && res.boom.hasOwnProperty(err['custom_error'])) {
          res.boom[err.custom_error](err.message, {code: err.code});
        } else {
          if (err.errors[0].code = 'INVALID_REQUEST_PARAMETER' ) {
            _processSchemaError(err.errors[0], res);
          } else if(err.hasOwnProperty('allowedMethods')) {
            res.boom.notFound('Invalid API call, please check api method & parameters.');
          } else {
            if (err.status === 400) {
              res.boom.badRequest('Bad Request', {code: 'BAD_REQUEST' });
            } else {
              res.boom.badImplementation('Internal Server Error');
            }
          }
        }
      } catch (e) {
        //log error
        _logError(req, e);
        res
          .status(500)
          .json({
            error: "internal_server_error",
            message: "internal_server_error",
            code: "FAILED_ERROR_HANDLER",
          });
      }
    }
  });
}

function _formatSwaggerError(err) {
  // convert swagger error's originalResponse from buffer to back to JSON.
  if (err.failedValidation && err.originalResponse) {
    var originalResponse = (err.originalResponse instanceof Buffer ? err.originalResponse : new Buffer(err.originalResponse.data)).toString('utf8');
    try {
      err.originalResponse = JSON.parse(originalResponse);
    } catch (e) {
      err.originalResponse = originalResponse;
    }
  }
}

function convertErrorToJSON(err) {
  if (!(err instanceof CustomError || err instanceof Error || err instanceof Object ) ) {
    return err;
  }
  var formattedError = {};
  var keys = Object.getOwnPropertyNames(err);
  if (this.stack)
    formattedError.stack = (err.stack || '').split('\n');
  for (var i in keys) {
    var key = keys[i];
    if (err.hasOwnProperty(key)) {
      formattedError[key] = err[key];
    }
  }
  return formattedError;
}

function _processSchemaError(err, res) {
  // If request validation error
  if (err.code === 'REQUIRED') {
    if (err.hasOwnProperty('paramName') && err.paramName) {
      res.boom.badRequest('Bad request - Missing filed(s): ' + err.paramName, {code: 'ERROR_REQUEST_SCHEMA' });
    } else {
      res.boom.badRequest('Bad request', {code: 'ERROR_REQUEST_SCHEMA' });
    }
  } else if (err.code === 'INVALID_REQUEST_PARAMETER') {
    if (err.message.indexOf('Invalid parameter') > -1) { // If request validation fails
      let filedNames = [];
      let missingFields = [];
      if (err.errors) {
        _.map(err.errors, (e) => {
          if (e.code === 'OBJECT_MISSING_REQUIRED_PROPERTY' && e.message.split(':').length > 1) {
            missingFields.push(e.message.split(':')[1]);
          } else {
            return filedNames.push(e.path[0]);
          }
        });
        filedNames = _.join(filedNames, ', ');
      }
      let message  = (filedNames.length) ? 'Invalid value for field(s): ' + filedNames : 'Bad Request';
      if (missingFields.length) {
        message = message + '; Missing field(s):' + _.join(missingFields, ',');
      }
      res.boom.badRequest(message, {code: 'ERROR_REQUEST_SCHEMA' });
    } else if (err.message.indexOf('Response validation failed') > -1) { // If response validation fails
      res.boom.badImplementation('API error', {code: 'ERROR_RES_VALIDATION'});
    } else {
      res.boom.badImplementation('API error', {code: 'ERROR_SCHEMA_VALIDATION'});
    }
  } else if (err.paramName) {
    let message = 'Invalid parameter value: ' +  err.paramName;
    res.boom.badRequest(message, {code: err.code });
  } else {
    res.boom.badRequest('Bad request', {code: err.code });
  }
}


function _logError(req, err) {
  req.logger.error({
    error: "request_error",
    date: new Date(),
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
    },
    __inner: convertErrorToJSON(err),
  });
}
