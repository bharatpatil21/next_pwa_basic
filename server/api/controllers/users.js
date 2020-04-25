'use strict';

let usersService = require('../../services/users');
let commonService = require('../../services/common');

module.exports = {
  getUsersNoSql: getUsersNoSql,
	getUsersSql: getUsersSql,
	getUser: getUser
};

function getUsersNoSql(req, res, next) {
  usersService.getUsersNoSqlAsync()
		.then((result) => {
			res.json(commonService.resJson('Users fetched successfully With Sequelize.', result));
		})
		.catch(next);
}

function getUsersSql(req, res, next) {
  usersService.getUsersSqlAsync()
		.then((result) => {
			res.json(commonService.resJson('Users fetched successfully With Sequelize and SQL Query.', result));
		})
		.catch(next);
}

function getUser(req, res, next) {
  let userId = req.swagger.params.userId.value;
  usersService.getUserAsync(userId)
    .then((result) => {
      res.json(commonService.resJson('User fetched successfully.', result));
    })
    .catch(next);
}