require('../constants/sequelize');

const {promisify} = require('util');
const readdir = promisify(require('fs-extra').readdir);
const unlink = promisify(require('fs-extra').unlink);

const ferryRoutes = require('../mongoose/ferry_routes');

/**
 * Gets all ferries list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    const data = req.query;
    let partner_id = data.partner_id;

    let wherePartner = {where: (partner_id ? {partner_id: data.partner_id} : {}), include: {model: Companies}};
    const result = await to(Ferries.findAll(wherePartner));

    if (!res.headersSent) {
        res.json(result);
    }
};

/**
 * Gets ferry partners list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getPartners = async (req, res) => {

    const partners = await to(Users.findAll({
        include: [
            {model: PartnerTypes, where: {name: 'Ferries'}}
        ]
    }));

    res.json(partners);
};

/**
 * Gets one ferry info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getOne = async (req, res) => {
    let data = req.query;
    let result = await to(Ferries.findOne({
        where: {id: data.id},
        include: [
            {model: Companies, attributes: ['id', 'name']}
        ]
    }));


    let r = await getOneItemImages(req, FERRIES_UPLOAD_FOLDER, result);
    // if (!res.headersSent) {
    res.json(r);
    // }
};

/**
 * Adds a new ferry
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.add = async (req, res) => {

    let data = req.body;
    uploadImages(req, res, async (err) => {

        // Getting validation result from express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array()[0]);
        }

        if (!showIfErrors(req, res, err)) {
            await Ferries.create(data);
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
    await Ferries.destroy({where: {id: data.id}});
    this.get(req, res);
};


exports.removeImage = async (req, res) => {
    let data = req.query;

    if (fse.existsSync(data.folder)) {
        // console.log(data.folder)
        console.log(FERRIES_UPLOAD_FOLDER)
        // Do something
        let files = await readdir(data.folder);

        files.map((async (file) => {
            if (file === data.file) {

                // console.log(file)
                await unlink(path.join(data.folder, file));

                this.getOne(req, res);
            }
        }));

        // if (!res.headersSent) {
        //     res.json('');
        // }
    }
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
    if (data.oldName !== data.name) await renameFolder(data.oldName, data.name, FERRIES_UPLOAD_FOLDER);


    uploadImages(req, res, async (err) => {

        // Getting validation result from express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array()[0]);
        }


        if (!showIfErrors(req, res, err)) {


            let id = data.id;
            delete data.id;
            delete data.img;
            await Ferries.update(data, {where: {id: id}});
            this.get(req, res);
        }
    })
};


exports.makeCover = async (req, res) => {
    let data = req.body;
    await Ferries.update({img: data.img}, {where: {id: data.id}});
    res.json("OK")
};

exports.assignDriver = async (req, res) => {
    let data = req.body;
    await Ferries.update({driver_id: data.driver_id}, {where: {id: data.ferry_id}});
    res.json("OK")
};

exports.getFerriesDirections = async (req, res) => {
    let data = req.query;
    let directions = await FerryDirections.findAll({attributes: ['name', 'latitude', 'longitude'], raw: true});

    // For order form mat-select
    if (data.dropdown) {

        directions.map(d => {
            d['coordinates'] = {latitude: +d.latitude, longitude: +d.longitude};
            delete d.latitude;
            delete d.longitude;
        });
    }
    res.json(directions);
};


exports.getFerriesDirectionsPrices = async (req, res) => {
    let data = req.query;
    let pricing = await FerryDirectionsPricing.findAll();
    res.json(pricing);
};


exports.getFerryDirectionPrice = async (req, res) => {
    let data = req.query;
    let pricing = await FerryDirectionsPricing.findAll(
        {
            where: {
                start_point: data.start_point,
                stop_1: data.stop_1,
                stop_2: data.stop_2,
                end_point: data.start_point
            }
        }
    );
    res.json(pricing);
};


exports.getRealLocations = async (req, res) => {
    // const options = {
    //     //     hostname: 'curl \'http://www.marinetraffic.com/ais/getjson.aspx?sw_x=0&sw_y=70&ne_x=30&ne_y=80&zoom=6&fleet=&station=0&id=null\' -H \'Referer: http://www.marinetraffic.com/ais/\'',
    //     // };
    //     // const curl = request(options.hostname, (res) => {
    //     //     console.log(res)
    //     // })

    // const { curly } = require('node-libcurl');

    const {statusCode, data, headers} = await curly.get('http://www.marinetraffic.com/ais/getjson.aspx?sw_x=0&sw_y=70&ne_x=30&ne_y=80&zoom=6&fleet=&station=0&id=null')

    console.log(statusCode, data)
};


/**
 * Removes a selected ferries gallery image
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.removeImage = async (req, res) => {
    await removeImage(req.query, res);
};

//@todo check if this and the following import function are still the same and change to one function is possible
exports.importGeoJSONFile = async (req, res) => {

    let data = req.body;

    await ferryRoutes.bulkWrite(
        data.map((dt) =>
            ({
                updateOne: {
                    filter: {
                        start_point: dt.start_point,
                        end_point: dt.end_point,
                        stop_1: dt.stop_1 ? dt.stop_1 : '',
                        stop_2: dt.stop_2 ? dt.stop_2 : ''

                    },
                    update: {
                        $set: dt
                    },
                    upsert: true
                }
            })
        ));

    res.json('OK')
};

exports.importPricesFile = async (req, res) => {
    let data = req.body;

    await ferryRoutes.bulkWrite(
        data.map((dt) =>
            ({
                updateOne: {
                    filter: {
                        start_point: dt.start_point,
                        end_point: dt.end_point,
                        stop_1: dt.stop_1 ? dt.stop_1 : '',
                        stop_2: dt.stop_2 ? dt.stop_2 : ''
                    },
                    update: {
                        $set: dt
                    },
                    upsert: true
                }
            })
        ));
    res.json("OK");
};


exports.addRoutePrice = async (req, res) => {
    let fr = new ferryRoutes(req.body);
    console.log(req.body)
    await fr.save();
    this.getAllRoutes(req, res);
};

exports.removeRoutePrice = async (req, res) => {
    await ferryRoutes.deleteOne({_id: req.query.id});
    this.getAllRoutes(req, res);
    // res.json('OK');
};


exports.getRoutePrice = async (req, res) => {
    let data = req.body;

    let route = await this.buildConditionAndCheck(data);
    if (!route || route.coordinates.length === 0) {
        let reversedRoute = await this.buildConditionAndCheck(data.reverse(), true);
        if (!reversedRoute) {
            res.status(444).json({msg: 'The selected route is not found'});
        } else {
            res.json(reversedRoute);
        }
    } else res.json(route);
};

exports.getAllRoutes = async (req, res) => {
    let dt = await ferryRoutes.find({coordinates: {$exists: true, $not: {$size: 0}}}, {}).select({
        "name": 1,
        "geometry_type": 1,
        "coordinates": 1
        // "coordinates.lat": 1,
        // "coordinates.lng": 1,

    });
    res.json(dt);
};


exports.buildConditionAndCheck = async (data, reversed = false) => {
    let condition = {stop_1: '', stop_2: ''};

    condition.start_point = data[0].name;
    if (data.length === 2) {
        condition.end_point = data[1].name;
    } else if (data.length === 3) {
        condition.stop_1 = data[1].name;
        condition.end_point = data[2].name;
    } else if (data.length === 4) {
        condition.stop_1 = data[1].name;
        condition.stop_2 = data[2].name;
        condition.end_point = data[3].name;
    }


    let dt = await ferryRoutes.findOne(condition);

    if (reversed && dt && dt.coordinates) {
        dt.coordinates = dt.coordinates.reverse();
    }
    return dt;
}
