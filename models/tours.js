'use strict';
module.exports = (sequelize, DataTypes) => {
    const tours = sequelize.define('tours', {
        name: DataTypes.STRING,
        company_id: DataTypes.INTEGER,
        tours_type_id: DataTypes.INTEGER,
        img: DataTypes.STRING,
        price: DataTypes.INTEGER,
    }, {timestamps: false, underscored: true});
    tours.associate = function (models) {
        // associations can be defined here
        tours.belongsTo(models.tours_type, {foreignKey: "tours_type_id"});
        // tours.belongsTo(models.users, {foreignKey: 'partner_id'})
        tours.belongsTo(models.companies, {foreignKey: 'company_id'});

        tours.belongsToMany(models.locations, {
            as: 'tour_locations',
            through: models.tours_locations,
            foreignKey: 'tour_id'
        });
        tours.hasMany(models.tours_dailies, {foreignKey: 'tour_id'})
    };
    return tours;
};
