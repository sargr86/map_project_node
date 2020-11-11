'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activities_orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  activities_orders.init({
    name: DataTypes.STRING,
    adults: DataTypes.INTEGER,
    children: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    date: DataTypes.DATE,
    client_email: DataTypes.STRING,
    client_full_name: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'activities_orders',
  });
  return activities_orders;
};