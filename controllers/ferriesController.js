require('../constants/sequelize');

/**
 * Gets all ferries list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    const result = await to(Ferries.findAll({}));
    res.json(result);
};

exports.add = async (req, res) => {
    let data = req.body;
    const result = Ferries.create(data);
    res.json(result);
};