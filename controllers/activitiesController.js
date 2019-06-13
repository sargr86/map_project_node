/**
 * Gets food-drink places
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    let result = await to(Activities.findAll({}));
    res.json(result);
};

/**
 * Gets food-drink partners list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getPartners = async (req, res) => {

    let statusWhere = sequelize.where(sequelize.col('`users_status`.`name_en`'), 'active');

    let userTypeWhere = sequelize.where(sequelize.col('`role.name_en`'), 'Partner');

    const partners = await to(Users.findAll({
        include: [
            {model: UsersStatuses, attributes: ['name_en', 'id'], where: {statusWhere}},
            {model: Roles, attributes: ['name_en', 'id'], where: {userTypeWhere}},
            {model: PartnerTypes, where: {name: 'Activities'}}
        ]
    }));

    res.json(partners);
};


/**
 * Gets one food-drink info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getOne = async (req, res) => {
    let data = req.query;
    let result = await Activities.findOne({
        where: {id: data.id},
        include: [
            {model: Users},
            {model: ActivityTypes},
            {model: Companies, attributes: ['id','name']}
        ]
    });

    res.json(result);
};


/**
 * Adds a new food-drink
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
    await Activities.create(data);
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
    await Activities.destroy({where: {id: data.id}});
    this.get(req, res);
};

/**
 * Updates a ferry info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.update = async (req, res) => {

    // Getting validation result from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array()[0]);
    }

    let data = req.body;
    let id = data.id;
    delete data.id;
    await Activities.update(data, {where: {id: id}});
    this.get(req, res);
};


/**
 * Gets all tour types list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getActivityTypes = async (req, res) => {
    let result = await ActivityTypes.findAll({});
    res.json(result);
};

/**
 * Adds a new tour type
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.addActivityType = async (req, res) => {

    // Getting validation result from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array()[0]);
    }

    await ActivityTypes.create(req.body);
    this.get(req, res);
};

/**
 * Updates a tour type
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.updateActivityType = async (req, res) => {

    // Getting validation result from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array()[0]);
    }

    let data = req.body;
    let id = data.id;
    delete data.id;
    await ActivityTypes.update(data, {where: {id: id}});
    this.get(req, res);
};

/**
 * Gets one tour type
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getOneActivityType = async (req, res) => {
    let data = req.query;
    let result = await ActivityTypes.findOne({
        where: {id: data.id}
    });
    res.json(result);
};

/**
 * Removes a tour type
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.removeActivityType = async (req, res) => {
    let data = req.query;
    await ActivityTypes.destroy({where: {id: data.id}});
    this.getActivityTypes(req, res);
};
