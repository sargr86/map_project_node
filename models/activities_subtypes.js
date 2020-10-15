'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class activities_subtypes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    activities_subtypes.init({
        type_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        price: DataTypes.INTEGER,
        double_price: DataTypes.INTEGER,
        min_age: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'activity_subtypes',
        underscored: true,
        timestamps: false
    });
    return activities_subtypes;
};