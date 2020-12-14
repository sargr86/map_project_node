require('../constants/sequelize');

const ferryRoutes = require('../mongoose/ferry_routes');

const rules = [
    body('start_point', 'Route start point is required').not().isEmpty(),
    // body('single', 'Route single direction price should be number').isDecimal(),
    // body('return', 'Route two-way direction price should be number').isDecimal(),
    body('end_point', 'Route end point is required').not().isEmpty(),
    // body('name', 'Route name is required').not().isEmpty()
    // Retrieving a tour with request name and checking tour existence
    body().custom(async (name, {req}) => {
        console.log(req.body)
        const data = req.body;
        let found = await FerryDirectionsPricing.findOne({
            where: {
                start_point: data.start_point,
                stop_1: data.stop_1,
                stop_2: data.stop_2,
                end_point: data.end_point
            }
        });
        if (found != null && !data.id) throw new Error('Route  exists');
        return true;
    })
    // body('start_point').not().isEmpty().withMessage('Tour latitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Tour latitude is invalid'),
    // body('end_point').not().isEmpty().withMessage('Tour longitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Tour longitude is invalid'),
    // body('partner_id', 'Tour partner is required').not().isEmpty(),
    // body('img').custom((img, {req}) => req.body.id || img).withMessage('Tour image is required'),

];

module.exports = {
    rules
};
