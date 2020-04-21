let _ = require("lodash");
let Promise = require("bluebird");

let customError = require("../shared/custom-error");
let AccountModal = require("../models/Users");

const sequelize = require("../middlewares/dbconnect");

module.exports = {
  getUsersNoSql: getUsersNoSql,
  getUsersSql: getUsersSql,
  getUser: getUser,
  updateUser: updateUser,
  createUser: createUser,
};

// Sequelize with No SQL Queries
function getUsersNoSql(cb) {
  return AccountModal.findAll().then((dbUsers) => {
    if (!dbUsers) {
      cb(
        new customError({
          custom_error: "notFound",
          message: "Users not found.",
        })
      );
    } else if (dbUsers) {
      return AccountModal.count().then((totalCount) => {
				let responses = {
					users: _.map(dbUsers, (user) => user.formatResponse(user.dataValues)),
					total: totalCount
				};
				cb(null, responses);
      });
    }
  });
}

// Sequelize with SQL Queries
function getUsersSql(cb) {
  return sequelize
    .query("SELECT * FROM salesforce.account", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((dbUsers) => {
      if (!dbUsers) {
        cb(
          new customError({
            custom_error: "notFound",
            message: "Users not found.",
          })
        );
      } else if (dbUsers) {
        return AccountModal.count().then((totalCount) => {
          let responses = {
            users: dbUsers,
            total: totalCount,
          };
          cb(null, responses);
        });
      }
    });
}

function getUser(userId, cb) {
  return AccountModal.findAll({ where: { id: userId } }).then((user) => {
    if (!user) {
      cb(
        new customError({
          custom_error: "notFound",
          message: "User not found.",
        })
      );
    } else if (user) {
      let userObj;
      user.map((user) => {
        userObj = user;
      });
      cb(null, userObj.formatResponse(userObj.dataValues));
    }
  });
}

function updateUser(userId, data, cb) {
  return sequelize
    .query(
      `UPDATE salesforce.account SET name='${data.name}' WHERE id=${userId}`
    )
    .then(() => {
      return AccountModal.findAll({ where: { id: userId } }).then((user) => {
        if (!user) {
          cb(
            new customError({
              custom_error: "notFound",
              message: "User not found.",
            })
          );
        } else if (user) {
          let userObj;
          user.map((user) => {
            userObj = user;
          });
          cb(null, userObj.formatResponse(userObj.dataValues));
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

function createUser(data, cb) {
  userObj = new AccountModal(data);
  return userObj.save().then((user) => {
    cb(null, user.formatResponse(user.dataValues));
  });
}

Promise.promisifyAll(module.exports);
