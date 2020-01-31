

/**
 * Gets food-drink places
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    let data = req.query;
    let companyWhere = data.company ? {name: data.company} : {};
    let result = await to(FoodDrink.findAll({
        include: [
            {model: Companies, attributes: ['name', 'id'], where: companyWhere}
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
        include: [
            {model: Companies, attributes: ['id', 'name']}
        ]
    });

    let r = await getOneItemImages(req, FOOD_DRINK_UPLOAD_FOLDER, result);
    res.json(r);

};


/**
 * Adds a new food-drink
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.add = async (req, res) => {
    let data = req.body;
    uploadTourImg(req, res, async (err) => {
        if (!showIfErrors(req, res, err)) {
            await FoodDrink.create(data);
            this.get(req, res)
        }
    })
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
exports.update = async (req, res) => {
    let data = req.body;

    // Renaming folder if name is changed
    if (data.oldName !== data.name) await renameFolder(data.oldName, data.name, FOOD_DRINK_UPLOAD_FOLDER);


    uploadTourImg(req, res, async (err) => {
        if (!showIfErrors(req, res, err)) {
            let id = data.id;
            delete data.id;
            await FoodDrink.update(data, {where: {id: id}});
            this.get(req, res);
        }
    })
};


exports.makeCover = async (req, res) => {
    let data = req.body;
    await FoodDrink.update({img: data.img}, {where: {id: data.id}});
    res.json("OK")
};

/**
 * Removes a selected food-drink gallery image
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.removeImage = async (req, res) => {
    await removeImage(req.query, res);
};
