'use strict';
module.exports = (sequelize, DataTypes) => {
  const ratings = sequelize.define('ratings', {
    order_id: DataTypes.STRING,
    customer_id: DataTypes.INTEGER,
    driver_id: DataTypes.INTEGER,
    driver_rating: DataTypes.INTEGER,
    driver_feedback: DataTypes.TEXT,
    customer_rating: DataTypes.INTEGER,
    customer_feedback: DataTypes.TEXT
  }, {});
  ratings.associate = function(models) {
    // associations can be defined here
  };
  return ratings;
};
