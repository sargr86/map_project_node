const ferriesController = require('./ferriesController');
const toursController = require('./toursController');


/**
 * Gets map data by partner type
 * @param req
 * @param res
 */
exports.getMapDataByType = async(req, res) => {
    const type = req.query.type.toLowerCase();
    console.log(type + 'Controller')
    let c = type + 'Controller';
};