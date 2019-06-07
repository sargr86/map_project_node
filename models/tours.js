'use strict';
module.exports = (sequelize, DataTypes) => {
  const tours = sequelize.define('tours', {
    name: DataTypes.STRING,
    company_id: DataTypes.INTEGER,
    img: DataTypes.STRING,
    address: DataTypes.TEXT,
    tours_type_id: DataTypes.INTEGER,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    partner_id: DataTypes.INTEGER
  }, {timestamps:false,underscored:true});
  tours.associate = function(models) {
    // associations can be defined here
    tours.belongsTo(models.tours_type, {foreignKey: "tours_type_id"});
    tours.belongsTo(models.users, {foreignKey: 'partner_id'})
    tours.belongsTo(models.companies, {foreignKey: 'company_id'});
  };
  return tours;
};
