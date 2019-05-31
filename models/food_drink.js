'use strict';
module.exports = (sequelize, DataTypes) => {
    const food_drink = sequelize.define('food_drink', {
        type_id: DataTypes.INTEGER,
        partner_id: DataTypes.INTEGER,
        company_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        lat: DataTypes.FLOAT,
        lng: DataTypes.FLOAT,
        address: DataTypes.TEXT,
        img: DataTypes.STRING
    }, {timestamps: false, underscore: true});
    food_drink.associate = function (models) {
        // associations can be defined here
        food_drink.belongsTo(models.users, {foreignKey: 'partner_id'})
    };
    return food_drink;
};
