'use strict';
module.exports = (sequelize, DataTypes) => {
  const ferries = sequelize.define('ferries', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    max_people: DataTypes.INTEGER,
    min_people: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    partner_id: DataTypes.INTEGER,
    type: DataTypes.INTEGER
  }, {});
  ferries.associate = function(models) {
    // associations can be defined here
  };
  return ferries;
};