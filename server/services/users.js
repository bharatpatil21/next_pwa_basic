let _ = require("lodash");
let sha1 = require("sha1");
let Promise = require("bluebird");

let CustomError = require("../lib/app_error");
let AccountModal = require("../models/Users");

let commonService = require("./common");

const sequelize = require("../middlewares/dbconnect");

module.exports = {
  createUser: createUser,
  getUsers: getUsers,
  getUser: getUser,
  updateUser: updateUser,
};

function createUser(data, cb) {
  let userObj = new AccountModal(data);
  let salt = sha1(commonService.generateSalt());
  userObj["username"] = userObj["email"];
  userObj["password_salt"] = salt;
  userObj["password"] = sha1(userObj["password"] + salt);
  return AccountModal.findOne({ where: { email: userObj.email } }).then(
    (user) => {
      if (user) {
        cb(
          new CustomError({
            custom_error: "conflict",
            message: "Email address is already in use.",
          })
        );
      } else {
        return userObj.save().then((user) => {
          cb(null, user.dataValues)
          // cb(null, user.formatResponse(user.dataValues));
        });
      }
    }
  );
}

function getUsers(cb) {
  return AccountModal.findAll().then((dbUsers) => {
    if (!dbUsers) {
      cb(
        new CustomError({
          custom_error: "notFound",
          message: "Users not found.",
        })
      );
    } else if (dbUsers) {
      return AccountModal.count().then((totalCount) => {
        let responses = {
          // users: _.map(dbUsers, (user) => user.formatResponse(user.dataValues)),
          users: _.map(dbUsers, (user) => user.dataValues),
          total: totalCount,
        };
        cb(null, responses);
      });
    }
  });
  // SQL Query
  // return sequelize
  //   .query("SELECT * FROM salesforce.account", {
  //     type: sequelize.QueryTypes.SELECT,
  //   })
  //   .then((dbUsers) => {
  //   })
}

function getUser(userId, cb) {
  return AccountModal.findOne({ where: { user_id: userId } }).then((user) => {
    if (!user) {
      cb(
        new CustomError({
          custom_error: "notFound",
          message: "User not found.",
        })
      );
    } else if (user) {
      cb(null, user.dataValues)
      // cb(null, user.formatResponse(user.dataValues));
    }
  });
}

function updateUser(userId, data, cb) {
  return sequelize
    .query(
      `UPDATE account SET first_name='${data.first_name}', last_name='${data.last_name}' WHERE user_id=${userId}`
    )
    .then(() => {
      AccountModal.findOne({ where: { user_id: userId } }).then((user) => {
        if (!user) {
          cb(
            new CustomError({
              custom_error: "notFound",
              message: "User not found.",
            })
          );
        } else if (user) {
          cb(null, user.dataValues)
          // cb(null, user.formatResponse(user.dataValues));
        }
      });
    });
  // return AccountModal.update(
  //   {
  //     name: data.name,
  //   },
  //   {
  //     where: { id: userId },
  //     returning: true, // needed for affectedRows to be populated
  //     plain: true, // makes sure that the returned instances are just plain objects
  //   }
  // )
}

Promise.promisifyAll(module.exports);
