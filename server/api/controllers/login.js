'use strict';

let loginService = require('../../services/login');
let commonService = require('../../services/common');

module.exports = {
  tokenGet: tokenGet
};

function tokenGet(req, res, next) {
  // Authenticate user
  loginService.authenticateAsync(req.body.email, req.body.password)
    .then((user) => {
      loginService.generateTokenAsync(user)
        .then((token) => {
          res.json(commonService.resJson('Authenticated successfully', token));
        })
        .catch(next);
    })
    .catch(next);
}
