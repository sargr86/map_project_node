require('../constants/sequelize');

const {promisify} = require('util');
const readdir = promisify(require('fs-extra').readdir);
const unlink = promisify(require('fs-extra').unlink);


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
        console.log(data.folder)
        console.log(FERRIES_UPLOAD_FOLDER)
        // Do something
        let files = await readdir(data.folder);

        files.map((async (file) => {
            if (file === data.file) {

                console.log(file)
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
