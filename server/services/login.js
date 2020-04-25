let _ = require("lodash");
let sha1 = require("sha1");
let Promise = require("bluebird");
let jwt = require("jsonwebtoken");

let AccountModal = require("../models/Users");
var CustomError = require("../lib/app_error");

let systemConfig = require("../config/system");

module.exports = {
  authenticate: authenticate,
  generateToken: generateToken,
  getAuthenticatedUser: getAuthenticatedUser,
};

function authenticate(email, password, cb) {
  return AccountModal.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        cb(
          new CustomError({
            custom_error: "notFound",
            message: "Couldn't find your account, please check Email.",
          })
        );
      } else {
        // Compare password
        let passwordHash = sha1(password + user.password_salt.trim());
        if (user.password.trim() !== passwordHash) {
          cb(
            new CustomError({
              custom_error: "unauthorized",
              message: "Invalid credentials.",
            })
          );
        } else {
          cb(null, user);
        }
      }
    })
    .catch((err) => cb(err));
}

function generateToken(user, cb) {
  // user = (typeof user === "object") ? user.formatResponse(user.dataValues) : user;
  let expiresIn = systemConfig.DEFAULT_TOKEN_EXPIRY; //TODO: Need to load
  // let tokenPayload = user.formatResponse(user.dataValues);
  let tokenPayload = user.dataValues;
  let secretKey = systemConfig.TOKEN_SECRET;
  let options = { expiresIn: expiresIn, issuer: "Eternus" };
  let token = jwt.sign(tokenPayload, secretKey, options);
  cb(null, { token, expires_in: expiresIn });
}

function getAuthenticatedUser(userId, cb) {
  return AccountModal.findOne({ where: { user_id: userId } }).then((user) => {
    if (!user) {
      cb(
        new CustomError({
          custom_error: "unauthorized",
          message: "Invalid Token",
          code: "TOKEN_USER_ERROR",
        })
      );
    }
    cb(null, user.dataValues)
    // cb(null, user.formatResponse(user.dataValues));
  });
}

Promise.promisifyAll(module.exports);
