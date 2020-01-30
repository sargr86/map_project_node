'use strict';
module.exports = (sequelize, DataTypes) => {
    const contacts = sequelize.define('contacts', {
        company_name: DataTypes.STRING,
        email: DataTypes.STRING,
        message: DataTypes.TEXT,
        accepted: DataTypes.INTEGER
    }, {underscored: true});
    contacts.associate = function (models) {
        // associations can be defined here
    };
    return contacts;
};
