"use strict";

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgres://pbxmkeqduuylvm:e333dce140158ac19cf102842e97e7da52c6cd1d4ac3b1cb0f5be921f36bdbf9@ec2-3-223-21-106.compute-1.amazonaws.com:5432/d3j4j21qca01fs",
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