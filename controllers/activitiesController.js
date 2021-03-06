/**
 * Gets food-drink places
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    let result = await to(Activities.findAll({
        include: [
            {model: Companies, attributes: ['id', 'name']}
        ]
    }));
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
            {model: ActivityTypes, attributes: ['id']},
            {model: Companies, attributes: ['id', 'name']}
        ],
    });

    let r = await getOneItemImages(req, ACTIVITIES_UPLOAD_FOLDER, result);
    res.json(r);
};


exports.getSubtypes = async (req, res) => {
    let data = req.query;
    console.log(data)
    let result = await ActivitySubTypes.findAll({
        where: {type_id: data.type_id},
    });

    res.json(result);
};


exports.getSingleSubtype = async (req, res) => {
    let data = req.query;
    let result = await ActivitySubTypes.findOne({
        where: {id: data.id},
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

    // Ensuring if folder created
    if (!fse.existsSync(data.folder)) {
        await fse.ensureDir(data.folder)
    }

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


    // Renaming folder if name is changed
    if (data.oldName !== data.name) await renameFolder(data.oldName, data.name, ACTIVITIES_UPLOAD_FOLDER);

    // Updating activities
    await Activities.update(data, {where: {id: id}});

    // Updating activities_act_types table
    let activityTypes = data.activity_types.split(',');

    await ActivitiesTypes.destroy({where: {act_id: id}});

    activityTypes.map((async (type_id) => {
        await ActivitiesTypes.create({
            act_id: id,
            act_type_id: type_id
        });
    }));

    this.get(req, res);
};


/**
 * Gets all tour types list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getActivityTypes = async (req, res) => {
    let result = await to(ActivityTypes.findAll({
        include: [
            {
                model: Activities, include: [{
                    model: Companies, attributes: ['name']
                }]
            }
        ]
    }));

    res.json(result);
    res.end();
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


exports.makeCover = async (req, res) => {
    let data = req.body;
    await Activities.update({img: data.img}, {where: {id: data.id}});
    res.json("OK")
};

exports.removeImage = async (req, res) => {
    await removeImage(req.query, res);
};

exports.createOrder = async (data) => {
    let c = await ActivitiesOrders.create(data);
    return c;
};

exports.getOrders = async (req, res) => {
    let c = await ActivitiesOrders.findAll({});
    console.log('OK')
    res.json(c);
};

// Changing orders statuses and assigning driver to a boat from here
exports.changeStatusFromSocket = async (data, status) => {
    await ActivitiesOrders.update({status: status}, {where: {id: data.id}});
    let order = ActivitiesOrders.findOne({where: {id: data.id}});
    return order;
};

exports.getClientOrders = async (req, res) => {
    let c = await ActivitiesOrders.findAll({id: req.query.id});
    res.json(c);
};

exports.getAllOrders = async (req, res) => {
    let c = await ActivitiesOrders.findAll({});
    res.json(c);
};
