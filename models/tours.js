'use strict';
module.exports = (sequelize, DataTypes) => {
    const tours = sequelize.define('tours', {
        name: DataTypes.STRING,
        company_id: DataTypes.INTEGER,
        img: DataTypes.STRING,
        start_date: DataTypes.DATEONLY,
        end_date: DataTypes.DATEONLY,
        start_time: DataTypes.STRING,
        end_time: DataTypes.STRING,
        tours_type_id: DataTypes.INTEGER,
        partner_id: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        participants_max_count: DataTypes.INTEGER
    }, {timestamps: false, underscored: true});
    tours.associate = function (models) {
        // associations can be defined here
        tours.belongsTo(models.tours_type, {foreignKey: "tours_type_id"});
        tours.belongsTo(models.users, {foreignKey: 'partner_id'})
        tours.belongsTo(models.companies, {foreignKey: 'company_id'});

        tours.belongsToMany(models.locations, {
            as: 'tour_locations',
            through: models.tours_locations,
            foreignKey: 'tour_id'
        });
    };
    return tours;
};
