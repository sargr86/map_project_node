'use strict';
module.exports = (sequelize, DataTypes) => {
    const partners = sequelize.define('partners', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        type: DataTypes.INTEGER
    }, {underscored: true});
    partners.associate = function (models) {
        // associations can be defined here
    };
    return partners;
};