'use strict';

let propertiesService = require('../../services/properties');
let commonService = require('../../services/common');

module.exports = {
  getProperties: getProperties
};

function getProperties(req, res, next) {
  propertiesService.getPropertiesAsync()
		.then((result) => {
			res.json(commonService.resJson('Properties fetched successfully.', result));
		})
		.catch(next);
}