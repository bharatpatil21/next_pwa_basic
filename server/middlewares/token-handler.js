"use strict";

let _ = require("lodash"),
  systemConfig = require("../config/system"),
  jwt = require("jsonwebtoken"),
  Promise = require("bluebird"),
  AppError = require("../lib/app_error"),
  loginService = require("../services/login");

module.exports = {
  eternus_jwt_bearer: (req, authOrSecDef, scopesOrApiKey, cb) => {
    // let permissions = req.swagger.operation["x-security-scopes"];
    let opts = {};
    opts.issuer = "Eternus";
    opts.ignoreExpiration = true;
    let reqToken = null;

    if (req.headers.authorization) {
      let match = req.headers.authorization.match(/Bearer (.+)/i);
      reqToken = match[1];
      req.token = reqToken;
    }
    if (!reqToken) {
      cb(new AppError({
        custom_error: "unauthorized",
        message: "Un Authorized",
      }));
    } else {
      return new Promise((resolve, reject) => {
        return jwt.verify(
          req.token,
          systemConfig.TOKEN_SECRET,
          opts,
          (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
          }
        );
      })
        .then((decoded) => {
          // Check if user exist or not
          return loginService
            .getAuthenticatedUserAsync(decoded.user_id)
            .then((user) => {
              // check login user authorized for api
              // if (permissions && !_.includes(permissions, user.admin_type)) {
              //   let errObj = {
              //     custom_error: "forbidden",
              //     message: "Forbidden",
              //   };
              //   throw new AppError(errObj);
              // }
              req.authUser = user;
              return;
            })
            .then(() => cb())
            .catch((e) => cb(e));
        })
        .catch((e) => {
          cb(new AppError( {
            custom_error: "unauthorized",
            message: "Un Authorized",
          }));
        });
    }
  },
};
