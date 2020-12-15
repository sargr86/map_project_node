'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ferry_routes_coordinates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ferry_routes_coordinates.belongsTo(models.ferry_directions, {foreignKey: 'status_id'});
    }
  };
  ferry_routes_coordinates.init({
    ferry_route_id: DataTypes.INTEGER,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ferry_routes_coordinates',
    timestamps: false
  });
  return ferry_routes_coordinates;
};