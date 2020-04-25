'use strict';

let usersService = require('../../services/users');
let commonService = require('../../services/common');

module.exports = {
  userCreate: userCreate,
  getUsers: getUsers,
	getUser: getUser,
	updateUser: updateUser
};

function userCreate(req, res, next) {
  usersService.createUserAsync(req.body)
    .then((result) => {
      res.json(commonService.resJson('User added successfully.', result));
    })
    .catch(next);
}

function getUsers(req, res, next) {
  usersService.getUsersAsync()
		.then((result) => {
			res.json(commonService.resJson('Users fetched successfully.', result));
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

function updateUser(req, res, next) {
	let userId = req.swagger.params.userId.value;
  usersService.updateUserAsync(userId, req.body)
    .then((result) => {
      res.json(commonService.resJson('User updated successfully.', result));
    })
    .catch(next);
}