'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tours_daily extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
          tours_daily.belongsTo(models.tours, {foreignKey: 'tour_id'});
        }
    };
    tours_daily.init({
        tour_id: DataTypes.INTEGER,
        company_id: DataTypes.INTEGER,
        type_id: DataTypes.INTEGER,
        start_date: {
            type: DataTypes.DATEONLY
        },
        end_date: {
            type: DataTypes.DATEONLY
        },
        start_time: {
            type: DataTypes.STRING
        },
        end_time: {
            type: DataTypes.STRING
        },
        max_participants_count: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'tours_dailies',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return tours_daily;
};
