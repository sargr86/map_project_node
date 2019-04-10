require('../constants/sequelize');

exports.get = async (req, res) => {
    let result = await Tours.findAll({});
    res.json(result);
};