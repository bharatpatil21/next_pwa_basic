const Sequelize = require('sequelize');
const sequelize = require('../middlewares/dbconnect');

const Account = sequelize.define('account', {
	name: {
		type: Sequelize.STRING
	},
	accountnumber: {
		type: Sequelize.STRING
	}
},
	{
		schema: 'salesforce' ,
    timestamps: false,
    freezeTableName: true
	}
);

module.exports = Account;