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

/**
 * Gets one ferry info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getOne = async (req, res) => {
    let data = req.query;
    let result = await Ferries.findOne({
        where: {id: data.id}
    });
    res.json(result);
};

/**
 * Adds a new ferry
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

    let data = req.body;
    await Ferries.create(data);
    this.get(req, res)
};


/**
 * Removes a ferry info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.remove = async (req, res) => {
    let data = req.query;
    await Ferries.destroy({where: {id: data.id}});
    this.get(req, res);
};

/**
 * Updates a ferry info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.update = async(req,res) =>{
    // Getting validation result from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array()[0]);
    }

    let data = req.body;
    let id = data.id;
    delete data.id;
    await Ferries.update(data, {where: {id: id}});
    this.get(req, res);
};