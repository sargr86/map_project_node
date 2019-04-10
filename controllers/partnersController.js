require('../constants/sequelize');

exports.get = async (req, res) => {
    let result = await Partners.findAll({});
    res.json(result);
};