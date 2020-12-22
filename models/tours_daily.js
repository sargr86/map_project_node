'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tours_daily extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tours_daily.init({
    tour_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tours_daily',
  });
  return tours_daily;
};