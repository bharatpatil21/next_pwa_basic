'use strict';

module.exports = CustomError;

function CustomError(options) {
  Error.captureStackTrace(this, this.constructor);
  this.custom_error = options.custom_error;
  this.message = options.message;
};


require('util').inherits(CustomError, Error);