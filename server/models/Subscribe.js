let _ = require("lodash");
const Sequelize = require("sequelize");
const sequelize = require("../middlewares/dbconnect");

const Subscribe = sequelize.define(
  "subscribe",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    end_point: {
      type: Sequelize.STRING,
      allowNull: false
    },
    expiration_time: {
      type: Sequelize.STRING,
      allowNull: true
		},
		keys: {
      type: Sequelize.JSON,
      allowNull: false
    },
    created_on: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: new Date()
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);


module.exports = Subscribe;
