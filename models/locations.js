'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class locations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      locations.belongsToMany(models.tours, {
        as: 'tour_locations',
        through: models.tours_locations,
        foreignKey: 'location_id'
      });
    }
  };
  locations.init({
    name: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'locations',
    underscored: true,
    timestamps: false
  });
  return locations;
};
