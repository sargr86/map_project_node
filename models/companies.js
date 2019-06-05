'use strict';
module.exports = (sequelize, DataTypes) => {
    const companies = sequelize.define('companies', {
        name: DataTypes.STRING,
        type_id: DataTypes.INTEGER,
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        }
    }, {underscored: true});
    companies.associate = function (models) {
        // associations can be defined here
        companies.belongsTo(models.partner_types, {foreignKey: 'type_id'})
    };
    return companies;
};
