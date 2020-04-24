'use strict';
let Promise = require('bluebird');
let crypto = require('crypto');

module.exports = {
  resJson: resJson,
  generateSalt: generateSalt
};

function resJson(message, data) {
  return {
    statusCode: 200,
    message,
    data
  };
}

function generateSalt() {
  var chars = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';
  var rnd = crypto.randomBytes(32), value = new Array(32), len = chars.length;
  for (var i = 0; i < 32; i++) {
    value[i] = chars[rnd[i] % len];
  }
  return value.join('');
}

Promise.promisifyAll(module.exports);
