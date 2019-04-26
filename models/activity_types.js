'use strict';
module.exports = (sequelize, DataTypes) => {
    const activity_types = sequelize.define('activity_types', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {timestamps: false, underscored: true});
    activity_types.associate = function (models) {
        // associations can be defined here
        activity_types.belongsTo(models.activities, {foreignKey: "id"});
    };
    return activity_types;
};