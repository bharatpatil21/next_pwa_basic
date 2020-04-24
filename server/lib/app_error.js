'use strict';

module.exports = AppError;

function AppError(options) {
  Error.captureStackTrace(this, this.constructor);
  this.custom_error = options.custom_error;
  this.message = options.message;
};


require('util').inherits(AppError, Error);