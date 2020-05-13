'use strict';
module.exports = (sequelize, DataTypes) => {
    const users_cards = sequelize.define('users_cards', {
        user_id: DataTypes.INTEGER,
        stripe_customer_id: DataTypes.STRING,
        card_id: DataTypes.STRING,
        holder_name: DataTypes.STRING,
        brand: DataTypes.STRING,
        country: DataTypes.STRING,
        number_part: DataTypes.STRING,
        expiry_date: DataTypes.STRING
    }, {underscored: true});
    users_cards.associate = function (models) {
        // associations can be defined here
    };
    return users_cards;
};
