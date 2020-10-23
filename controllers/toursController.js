require('../constants/sequelize');

/**
 * Gets all tours list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    let result = await Tours.findAll({
        include: [
            {model: ToursType},
            {model: Companies, attributes: ['id', 'name']}
        ]
    });
    res.json(result);
};

/**
 * Gets one tour info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getOne = async (req, res) => {
    let data = req.query;
    let result = await Tours.findOne({
        where: {id: data.id},
        include: [
            {model: Companies, attributes: ['id', 'name']}
        ]
    });

    let r = await getOneItemImages(req, TOURS_UPLOAD_FOLDER, result);
    console.log(r)
    res.json(r);
};

/**
 * Gets tour partners list
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
            {model: PartnerTypes, where: {name: 'Tours'}}
        ]
    }));

    res.json(partners);
};

/**
 * Adds a new tour
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.add = async (req, res) => {

    const data = req.body;

    uploadProfileImg(req, res, async (err) => {


        // // Gets file type validation error
        // if (req.fileTypeError) {
        //     res.status(423).json(req.fileTypeError);
        // }
        //
        // // Getting multer errors if any
        // else if (err) res.status(423).json(err);
        //
        // // If file validation passed, heading to the request data validation
        // else {
        //
        //     // Getting validation result from express-validator
        //     const errors = validationResult(req);
        //     if (!errors.isEmpty()) {
        //         return res.status(422).json(errors.array()[0]);
        //     }
        if (!showIfErrors(req, res, err)) {

            await Tours.create(data);
            this.get(req, res);
        }
        // }
    })
};

/**
 * Updates a tour type
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.update = async (req, res) => {
    const data = req.body;

    uploadProfileImg(req, res, async (err) => {

        // Gets file type validation error
        if (req.fileTypeError) {
            res.status(423).json(req.fileTypeError);
        }

        // Getting multer errors if any
        else if (err) res.status(423).json(err);

        // If file validation passed, heading to the request data validation
        else {

            // Getting validation result from express-validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json(errors.array()[0]);
            }

            let id = data.id;
            delete data.id;
            await Tours.update(data, {where: {id: id}});
            this.get(req, res);
        }
    })
};

/**
 * Removes a tour
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.remove = async (req, res) => {
    let data = req.query;
    await Tours.destroy({where: {id: data.id}});
    this.get(req, res);
};

/**
 * Gets all tour types list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getTourTypes = async (req, res) => {
    let result = await ToursType.findAll({});
    if (!res.headersSent) {
        res.json(result);
    }

};

/**
 * Adds a new tour type
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.addTourType = async (req, res) => {

    // Getting validation result from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array()[0]);
    }

    await ToursType.create(req.body);
    this.get(req, res);
};

/**
 * Updates a tour type
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.updateTourType = async (req, res) => {

    // Getting validation result from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array()[0]);
    }

    let data = req.body;
    let id = data.id;
    delete data.id;
    await ToursType.update(data, {where: {id: id}});
    this.get(req, res);
};

/**
 * Gets one tour type
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getOneTourType = async (req, res) => {
    let data = req.query;
    let result = await ToursType.findOne({
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
exports.removeTourType = async (req, res) => {
    let data = req.query;
    await ToursType.destroy({where: {id: data.id}});
    this.getTourTypes(req, res);
};
