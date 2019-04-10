'use strict';
module.exports = (sequelize, DataTypes) => {
    const partner_type = sequelize.define('partner_types', {
        name: DataTypes.STRING
    }, {timestamps: false});
    partner_type.associate = function (models) {
        // associations can be defined here
    };
    return partner_type;
};