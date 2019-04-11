'use strict';
module.exports = (sequelize, DataTypes) => {
  const tours_type = sequelize.define('tours_type', {
    tour_name: DataTypes.STRING
  }, {timestamps:false,tableName: 'tours_type'});
  tours_type.associate = function(models) {
    // associations can be defined here
    tours_type.belongsTo(models.tours, {foreignKey: "id"});
  };
  return tours_type;
};