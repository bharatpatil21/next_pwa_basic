"use strict";

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgres://ysnayegdnjtzim:513e64ed98afb092db1ddf5fafac96d627c79d9405bc17c770742f983ac05609@ec2-52-202-22-140.compute-1.amazonaws.com:5432/d9ia70arm0m5go",
  {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: true,
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Error while connecting to Database", err);
  });

module.exports = sequelize;