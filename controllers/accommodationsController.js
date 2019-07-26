/**
 * Gets food-drink places
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    let result = await to(Accommodations.findAll({
        attributes: ['name', 'img'],
        include: [
            {model: Companies, attributes: ['id', 'name']}
        ]
    }));

    let ret = [];

    // result.map(img => {
    //     img = img.toJSON();
    //     if (img['small']) {
    //
    //         // Searching the current file by name and appending full path on the end to it
    //
    //         let search = 'http://' + req.headers.host + '/uploads/others/accommodations/' + img['small'];
    //
    //         // Preparation for ngx-gallery in frontend
    //         img['big'] = img['small'] = img['medium'] = search;
    //
    //         ret.push(img)
    //     }
    //
    //
    // });


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
            {model: PartnerTypes, where: {name: 'Accommodations'}}
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
    let result = await Accommodations.findOne({
        where: {id: data.id},
        include: [
            {model: Users},
            {model: Companies, attributes: ['id', 'name']}
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
    await Accommodations.create(data);
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
    await Accommodations.destroy({where: {id: data.id}});
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
    await Accommodations.update(data, {where: {id: id}});
    this.get(req, res);
};
