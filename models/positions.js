'use strict';
module.exports = (sequelize, DataTypes) => {
    const positions = sequelize.define('positions', {
        name: DataTypes.STRING
    }, {underscored: true, timestamps: false});
    positions.associate = function (models) {
        // associations can be defined here
    };
    return positions;
};
