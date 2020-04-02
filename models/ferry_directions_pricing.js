'use strict';
module.exports = (sequelize, DataTypes) => {
  const ferry_directions_pricing = sequelize.define('ferry_directions_pricings', {
    start_point: DataTypes.STRING,
    stop_1: DataTypes.STRING,
    stop_2: DataTypes.STRING,
    end_point: DataTypes.STRING,
    min_people: DataTypes.INTEGER,
    single: DataTypes.INTEGER,
    return: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {timestamps:false});
  ferry_directions_pricing.associate = function(models) {
    // associations can be defined here
  };
  return ferry_directions_pricing;
};
