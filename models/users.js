'use strict';
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        role_id: DataTypes.INTEGER,
        status_id: DataTypes.INTEGER,
        partner_type_id: DataTypes.INTEGER,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        birthday: DataTypes.DATEONLY,
        gender: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        profile_img: DataTypes.STRING,
    }, {underscored: true});
    users.associate = function (models) {
        // users.belongsToMany(models.roles, {through: models.users_roles, foreignKey: 'user_id'})
        users.belongsTo(models.users_statuses, {foreignKey: 'status_id'})
        users.belongsTo(models.roles, {foreignKey: 'role_id'})
    };
    return users;
};