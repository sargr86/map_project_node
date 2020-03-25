'use strict';
module.exports = (sequelize, DataTypes) => {
    const ferries = sequelize.define('ferries', {
        name: DataTypes.STRING,
        company_id: DataTypes.INTEGER,
        driver_id: DataTypes.INTEGER,
        max_people: DataTypes.INTEGER,
        min_people: DataTypes.INTEGER,
        phone: DataTypes.STRING,
        address: DataTypes.TEXT,
        lat: DataTypes.STRING,
        lng: DataTypes.STRING,
        partner_id: DataTypes.INTEGER,
        type: DataTypes.INTEGER,
        img: DataTypes.STRING,
    }, {timestamps: false, underscored: true});
    ferries.associate = function (models) {
        // associations can be defined here
        // ferries.belongsTo(models.users, {foreignKey: 'partner_id'});
        ferries.belongsTo(models.companies, {foreignKey: 'company_id'})
        // ferries.belongsTo(models.users, {foreignKey: 'id'})
    };
    return ferries;
};
