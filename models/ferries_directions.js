'use strict';
module.exports = (sequelize, DataTypes) => {
  const ferries_directions = sequelize.define('ferries_directions', {
    name: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {underscored: true});
  ferries_directions.associate = function(models) {
    // associations can be defined here
  };
  return ferries_directions;
};
