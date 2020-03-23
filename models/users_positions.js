'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_positions = sequelize.define('users_positions', {
    user_id: DataTypes.INTEGER,
    position_id: DataTypes.INTEGER
  }, {});
  users_positions.associate = function(models) {
    // associations can be defined here
  };
  return users_positions;
};