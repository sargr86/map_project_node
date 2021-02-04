require('../constants/sequelize');
const moment = require('moment');
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
            {model: Companies, attributes: ['id', 'name']},
            {model: Locations, as: 'tour_locations', attributes: ['name']},
            {model: ToursDailies}
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
            {model: Companies, attributes: ['id', 'name']},
            {model: Locations, as: 'tour_locations'},
            {model: ToursDailies, attributes: {exclude: ['id']}}
        ]
    });

    let r = await getOneItemImages(req, TOURS_UPLOAD_FOLDER, result);
    console.log(r)
    res.json(r);
};

exports.getTourDailies = async (req, res) => {
    let data = req.query;
    const {scheduled, date, name, search, order, today} = data;
    console.log('filter!!!!' + scheduled)
    let weekStart = moment().startOf('isoWeek').format('YYYY-MM-DD')
    let weekEnd = moment().endOf('isoWeek').format('YYYY-MM-DD')
    // let whereDate = scheduled === '0' ? {start_date: {[Op.eq]: today}} : {
    //     start_date: {[Op.gt]: today}
    // };

    console.log('name' + name)
    let whereTour = name ? sequelize.where(sequelize.col('tour.name'), name) : {};

    if (date && !search) {
        weekStart = moment(date).startOf('isoWeek').format('YYYY-MM-DD')
        weekEnd = moment(date).endOf('isoWeek').format('YYYY-MM-DD')
        // whereDate = date ? {start_date: {[Op.eq]: date}} : {};
    }
    let whereDate = {
        start_date: {
            [Op.between]: [weekStart, weekEnd]
        }
    };

    if (today) {
        let todayVal = moment().format('YYYY-MM-DD');
        whereDate = {start_date: {[Op.lte]: todayVal}, end_date: {[Op.gte]: todayVal}};
    }


    if (search) {
        // whereTour = {where: {name: {[Op.like]: `%${search}%`}}};
        whereTour = sequelize.where(sequelize.col('tour.name'), 'like', `%${search}%`);
        whereDate = date ? {start_date: {[Op.lte]: date}, end_date: {[Op.gte]: date}} : {};
    }


    let orderColumns = [];

    if (order) {
        orderColumns.push(['price', order]);
    }

    orderColumns.push(['start_date', 'desc']);

    console.log(whereDate)

    let td = await ToursDailies.findAll({
        include: [{
            model: Tours, include: [
                {model: Locations, as: 'tour_locations'},
                {model: Companies},
                {model: ToursType}
            ]
        }],
        where: [whereDate, whereTour],
        order: orderColumns
    });
    res.json(td);
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
        if (req.fileTypeError) {
            res.status(423).json(req.fileTypeError);
        }
        //
        // // Getting multer errors if any
        else if (err) res.status(423).json(err);
        //
        // If file validation passed, heading to the request data validation
        else {

            let folder = path.join(UPLOADS_FOLDER, 'others/' + data.folder + '/' + data.name.replace(/ /g, '_'));

            console.log('ensure!!!!' + folder)
            if (!fse.existsSync(folder)) {
                console.log('ensure!!!!' + folder)
                await fse.ensureDir(folder)
            }

            // Getting validation result from express-validator
            const errors = validationResult(req);
            // console.log(errors.array())
            if (!errors.isEmpty()) {
                return res.status(422).json(errors.array()[0]);
            }

            // if (!showIfErrors(req, res, err)) {


            let t = await Tours.create(data);
            await ToursDailies.create({tour_id: t.id, ...data});
            console.log(JSON.parse(data.locations))
            JSON.parse(data.locations).map(async (l) => {
                await TourLocations.create({location_id: l.id, tour_id: t.id});
            });
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

            // Renaming folder if name is changed
            if (data.oldName !== data.name) await renameFolder(data.oldName, data.name, TOURS_UPLOAD_FOLDER);

            let id = data.id;
            delete data.id;
            data.folder = path.basename(data.folder);


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
    let {id, name} = req.query;
    let folder = path.join(UPLOADS_FOLDER, 'others/tours/' + name.replace(/ /g, '_'));

    // Removing the corresponding folder
    if (fse.existsSync(folder)) {
        await to(fse.remove(folder))
    }

    await to(Tours.destroy({where: {id: id}}));
    await to(TourLocations.destroy({where: {tour_id: id}}));
    await to(ToursDailies.destroy({where: {tour_id: id}}));

    this.get(req, res);
};

exports.removeImage = async (req, res) => {
    await removeImage(req.query, res);
};

exports.makeCover = async (req, res) => {
    let data = req.body;
    await Tours.update({img: data.img}, {where: {id: data.id}});
    res.json("OK")
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

exports.createOrder = async (data) => {
    let c = await ToursOrders.create(data);
    return c;
};

// Changing orders statuses and assigning driver to a boat from here
exports.changeStatusFromSocket = async (data, status) => {
    await ToursOrders.update({status: status}, {where: {id: data.id}});
    let order = ToursOrders.findOne({where: {id: data.id}});
    return order;
};

exports.updateDailyTourDates = async (req, res) => {
    const {start_date, end_date, id} = req.body;
    await ToursDailies.update({start_date: start_date, end_date: end_date}, {where: {id: id}});
    this.getTourDailies(req, res);
};

exports.updateDailyTour = async (req, res) => {
    const data = req.body;
    const {id} = data;
    await ToursDailies.update(data, {where: {id: id}});
    this.getTourDailies(req, res);
};

exports.removeDailyTour = async (req, res) => {
    const data = req.query;
    await ToursDailies.destroy({where: {id: data.id}});
    this.getTourDailies(req, res);
};


exports.addDaily = async (req, res) => {
    let data = req.body;
    await ToursDailies.create(data);
    this.getTourDailies(req, res);
};
