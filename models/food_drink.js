'use strict';
module.exports = (sequelize, DataTypes) => {
  const food_drink = sequelize.define('food_drink', {
    type_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    address: DataTypes.TEXT,
    img: DataTypes.STRING
  }, {});
  food_drink.associate = function(models) {
    // associations can be defined here
  };
  return food_drink;
};