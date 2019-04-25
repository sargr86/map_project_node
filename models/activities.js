'use strict';
module.exports = (sequelize, DataTypes) => {
    const activities = sequelize.define('activities', {
        partner_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        lat: DataTypes.STRING,
        lng: DataTypes.STRING,
        address: DataTypes.TEXT,
        img: DataTypes.STRING
    }, {timestamps: false, underscored: true});
    activities.associate = function (models) {
        // associations can be defined here
    };
    return activities;
};