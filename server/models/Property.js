let _ = require("lodash");
const Sequelize = require("sequelize");
const sequelize = require("../middlewares/dbconnect");

const Property = sequelize.define(
  "property",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lat: {
      type: Sequelize.NUMBER,
      allowNull: false
		},
		lng: {
      type: Sequelize.NUMBER,
      allowNull: false
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.NUMBER,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    },
    created_on: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// Property.prototype.formatResponse = function (dataObj) {
//   return _.omit(dataObj, ["password", "password_salt", "facebook_id", "google_id", "created_on"]);
// };

module.exports = Property;
