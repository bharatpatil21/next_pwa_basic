'use strict';

let subscribeService = require('../../services/subscribe');
let commonService = require('../../services/common');

module.exports = {
  addSubscribe: addSubscribe,
  sendNotification: sendNotification
};

function addSubscribe(req, res, next) {
  subscribeService.userSubscribeAddAsync(req.body)
    .then((subscribe) => {
      res.json(commonService.resJson('Subscribe successfully', subscribe));
    })
    .catch(next);
}

function sendNotification(req, res, next) {
  subscribeService.pushNotificationSendAsync(req.body)
    .then((subscribe) => {
      res.json(commonService.resJson('Notification send successfully', subscribe));
    })
    .catch(next);
}