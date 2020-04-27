let _ = require("lodash");
let Promise = require("bluebird");
let webPush = require("web-push");

let systemConfig = require("../config/system");

let CustomError = require("../lib/app_error");
let SubscribeModal = require("../models/Subscribe");

module.exports = {
  userSubscribeAdd: userSubscribeAdd,
  pushNotificationSend: pushNotificationSend,
  notificationSend: notificationSend,
};

function userSubscribeAdd(data, cb) {
  let reqData = {
    end_point: data.endpoint,
    expiration_time: data.expirationTime,
    keys: data.keys,
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

function pushNotificationSend(data, cb) {
  return SubscribeModal.findAll().then((subscribers) => {
    if (!subscribers) {
      cb(
        new CustomError({
          custom_error: "notFound",
          message: "Subscribers not found.",
        })
      );
    } else if (subscribers) {
      return Promise.map(subscribers, (subscribe) => {
        let subscriptionObj = {
          endpoint: subscribe.dataValues.end_point,
          expirationTime: subscribe.dataValues.expiration_time,
          keys: subscribe.dataValues.keys,
        };
        return subscriptionObj;
      }).then((subscriptions) => {
        return Promise.map(subscriptions, (subscription) => {
          this.notificationSendAsync(subscription, JSON.stringify(data));
          return;
        }).then(() => cb());
      });
    }
  });
}

function notificationSend(subscription, payload, cb) {
  const publicVapidKey = systemConfig.WEB_PUSH_PUBLIC_KEY;
  const privateVapidKey = systemConfig.WEB_PUSH_PRIVATE_KEY;
  const mailTo = systemConfig.WEB_PUSH_MAIL_TO;
  webPush.setVapidDetails(mailTo, publicVapidKey, privateVapidKey);
  webPush.sendNotification(subscription, payload).catch((error) => {
    console.error("FAIL TO SEND NOTIFICATION", error);
  });
  cb();
}

Promise.promisifyAll(module.exports);
