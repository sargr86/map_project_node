'use strict';
module.exports = (sequelize, DataTypes) => {
  const ferries_directions = sequelize.define('ferries_directions', {
    name: DataTypes.STRING,
    latitude: DataTypes.DECIMAL(10, 6),
    longitude: DataTypes.DECIMAL(11, 6)
  }, {underscored: true});
  ferries_directions.associate = function(models) {
    // associations can be defined here
  };
  return ferries_directions;
};
