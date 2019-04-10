'use strict';
module.exports = (sequelize, DataTypes) => {
  const tours = sequelize.define('tours', {
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    address: DataTypes.TEXT,
    tours_type_id: DataTypes.INTEGER,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    partner_id: DataTypes.INTEGER
  }, {timestamps:false,underscored:true});
  tours.associate = function(models) {
    // associations can be defined here
  };
  return tours;
};