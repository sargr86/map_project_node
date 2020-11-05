'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class accommodation_orders extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    accommodation_orders.init({
        children: DataTypes.INTEGER,
        adults: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        checkin_date: DataTypes.DATE,
        checkout_date: DataTypes.DATE,
        client_full_name: DataTypes.STRING,
        status: DataTypes.STRING,
        client_email: DataTypes.STRING,
        location: DataTypes.STRING,
        address: DataTypes.STRING,
        rooms: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'accommodation_orders',
        timestamps: false
    });
    return accommodation_orders;
};
