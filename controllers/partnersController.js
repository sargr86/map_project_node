require('../constants/sequelize');

/**
 * Gets all partners list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    let result = await Partners.findAll({});
    res.json(result);
};

/**
 * Gets one partner info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getOne = async (req, res) => {
    let data = req.query;
    let result = await Partners.findOne({
        where: {id: data.id}, attributes: ['first_name', 'last_name', 'email', 'type', 'id']
    });
    res.json(result);
};

/**
 * Gets partner types list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getTypes = async (req, res) => {
    let result = await to(PartnerTypes.findAll({}));
    res.json(result);
};

/**
 * Adds a new partner
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.add = async (req, res) => {

    // Getting validation result from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array()[0]);
    }

    await Partners.create(req.body);
    this.get(req,res);
};

/**
 * Removes a partner info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.remove = async (req, res) => {
    let data = req.query;
    await Partners.destroy({where: {id: data.id}});
    this.get(req, res);
};

/**
 * Updates a partner info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.update = async (req, res) => {
    let data = req.body;
    let id = data.id;
    delete data.id;
    await Partners.update(data, {where: {id: id}});
    this.get(req, res);
};