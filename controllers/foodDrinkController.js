/**
 * Gets food-drink places
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    let result = await to(FoodDrink.findAll({}));
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
            {model: PartnerTypes, where: {name: 'Food/Drink'}}
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
    let result = await FoodDrink.findOne({
        where: {id: data.id},
        include:[
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
    await FoodDrink.create(data);
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
    await FoodDrink.destroy({where: {id: data.id}});
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
    await FoodDrink.update(data, {where: {id: id}});
    this.get(req, res);
};
