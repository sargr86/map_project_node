'use strict';
module.exports = (sequelize, DataTypes) => {
    const activity_types = sequelize.define('activity_types', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {timestamps: false, underscored: true});
    activity_types.associate = function (models) {
        // associations can be defined here
        // activity_types.hasMany(models.activities, {foreignKey: "activity_type_id"});
        activity_types.belongsToMany(models.activities, {
            through: models.activities_act_types,
            foreignKey: 'act_type_id',
            targetKey: 'id'
        }, {underscored: true});
    };
    return activity_types;
};
