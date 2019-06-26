require('../constants/sequelize');

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
    res.json(result);
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
    let result = await Ferries.findOne({
        where: {id: data.id},
        include: [
            {model: Companies, attributes: ['id', 'name']}
        ]
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

    if (!showIfErrors(req, res, err)) {
        let data = req.body;
        await Ferries.create(data);
        this.get(req, res)
    }


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
exports.update = async (req, res) => {

    let data = req.body;
    uploadProfileImg(req, res, async (err) => {

        // Getting validation result from express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array()[0]);
        }


        if (!showIfErrors(req, res, err)) {


            let id = data.id;
            delete data.id;
            await Ferries.update(data, {where: {id: id}});
            this.get(req, res);
        }
    })
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
