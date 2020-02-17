'use strict';
module.exports = (sequelize, DataTypes) => {
  const activities_act_types = sequelize.define('activities_act_types', {
    act_id: DataTypes.INTEGER,
    act_type_id: DataTypes.INTEGER
  }, {timestamps:false});
  activities_act_types.associate = function(models) {
    // associations can be defined here

  };
  return activities_act_types;
};
