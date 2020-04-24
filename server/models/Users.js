let _ = require("lodash");
const Sequelize = require("sequelize");
const sequelize = require("../middlewares/dbconnect");

const Account = sequelize.define(
  "account",
  {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
		},
		password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password_salt: {
      type: Sequelize.STRING,
      allowNull: false
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    facebook_id: {
      type: Sequelize.NUMBER,
      allowNull: true
    },
    google_id: {
      type: Sequelize.NUMBER,
      allowNull: true
    },
    created_on: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: new Date()
    },
  },
  {
    // schema: "salesforce",
    timestamps: false,
    freezeTableName: true,
  }
);

Account.prototype.formatResponse = function (dataObj) {
  return _.omit(dataObj, ["password", "password_salt", "facebook_id", "google_id", "created_on"]);
};

module.exports = Account;
