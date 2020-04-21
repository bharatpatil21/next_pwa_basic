let _ = require('lodash');
const Sequelize = require("sequelize");
const sequelize = require("../middlewares/dbconnect");

const Account = sequelize.define(
  "account",
  {
    createddate: {
      type: Sequelize.DATE,
			allowNull: true,
			defaultValue: new Date()
    },
    isdeleted: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		systemmodstamp: {
			type: Sequelize.DATE,
      allowNull: true,
		},
    accountnumber: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		accountsource: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		billingcity: {
			type: Sequelize.STRING,
			allowNull: true,
    },
    sfid: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		id: {
      type: Sequelize.INTEGER,
			allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
		_hc_lastop: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		_hc_err: {
			type: Sequelize.STRING,
			allowNull: true,
    }
  },
  {
    schema: "salesforce",
    timestamps: false,
    freezeTableName: true,
  }
);

Account.prototype.formatResponse = function(dataObj) {
  return _.omit(dataObj, [ 'sfid', '_hc_lastop', '_hc_err']);
};

module.exports = Account;
