let _ = require("lodash");
let Promise = require("bluebird");

let CustomError = require("../lib/app_error");
let SubscribeModal = require("../models/Subscribe");

module.exports = {
  userSubscribeAdd: userSubscribeAdd,
};

function userSubscribeAdd(data, cb) {
  let reqData = {
    end_point: data.endpoint,
    expiration_time: data.expirationTime,
    keys: data.keys
  };
  let subscribeObj = new SubscribeModal(reqData);
  return subscribeObj.save().then((subscribe) => {
    if (!subscribe) {
      cb(
        new CustomError({
          custom_error: "bad_request",
          message: "Please try again after some time",
        })
      );
    } else {
      cb(null, subscribe.dataValues);
    }
  });
}

Promise.promisifyAll(module.exports);
