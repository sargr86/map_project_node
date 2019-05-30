'use strict';
module.exports = (sequelize, DataTypes) => {
  const companies = sequelize.define('companies', {
    name: DataTypes.STRING,
    type_id: DataTypes.INTEGER
  }, {});
  companies.associate = function(models) {
    // associations can be defined here
  };
  return companies;
};
