'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tours_orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tours_orders.init({
    tour_type_id: DataTypes.INTEGER,
    children: DataTypes.INTEGER,
    adults: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    date: DataTypes.DATE,
    client_full_name: DataTypes.STRING,
    status: DataTypes.STRING,
    client_email: DataTypes.STRING,
    location: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tours_orders',
  });
  return tours_orders;
};