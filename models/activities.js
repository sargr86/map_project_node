'use strict';
module.exports = (sequelize, DataTypes) => {
    const activities = sequelize.define('activities', {
        partner_id: DataTypes.INTEGER,
        company_id: DataTypes.INTEGER,
        activity_type_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        lat: DataTypes.STRING,
        lng: DataTypes.STRING,
        address: DataTypes.TEXT,
        img: DataTypes.STRING
    }, {timestamps: false, underscored: true});
    activities.associate = function (models) {
        // associations can be defined here
        activities.belongsTo(models.activity_types, {foreignKey: "activity_type_id"});
        activities.belongsTo(models.users, {foreignKey: 'partner_id'});
        activities.belongsTo(models.companies, {foreignKey: 'company_id'});
    };
    return activities;
};
