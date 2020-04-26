let _ = require("lodash");
let Promise = require("bluebird");

let CustomError = require("../lib/app_error");
let PropertyModal = require("../models/Property");

module.exports = {
  getProperties: getProperties
};

function getProperties(cb) {
  return PropertyModal.findAll().then((dbProperties) => {
    if (!dbProperties) {
      cb(
        new CustomError({
          custom_error: "notFound",
          message: "Properties not found.",
        })
      );
    } else if (dbProperties) {
      return PropertyModal.count().then((totalCount) => {
        let responses = {
          // properties: _.map(dbProperties, (property) => property.formatResponse(property.dataValues)),
          properties: _.map(dbProperties, (property) => property.dataValues),
          total: totalCount,
        };
        cb(null, responses);
      });
    }
  });
}

Promise.promisifyAll(module.exports);
