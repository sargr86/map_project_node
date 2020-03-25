'use strict';
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        role_id: DataTypes.INTEGER,
        position_id: DataTypes.INTEGER,
        status_id: DataTypes.INTEGER,
        company_id: DataTypes.INTEGER,
        partner_type_id: DataTypes.INTEGER,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        birthday: DataTypes.DATEONLY,
        gender: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        password: DataTypes.STRING,
        profile_img: DataTypes.STRING,
    }, {underscored: true});
    users.associate = function (models) {
        // users.belongsToMany(models.roles, {through: models.users_roles, foreignKey: 'user_id'})
        users.belongsTo(models.users_statuses, {foreignKey: 'status_id'});
        users.belongsTo(models.roles, {foreignKey: 'role_id'});
        // users.belongsToMany(models.positions, {through: models.users_positions, foreignKey: 'user_id'})
        users.belongsTo(models.positions, {foreignKey: 'position_id'});
        users.belongsTo(models.partner_types, {foreignKey: 'partner_type_id'})
        users.belongsTo(models.companies, {foreignKey: 'company_id'})
        users.hasOne(models.ferries, {foreignKey: 'driver_id'})
    };
    return users;
};
