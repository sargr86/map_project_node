require('../constants/sequelize');

const ferryRoutes = require('../mongoose/ferry_routes');

const rules = [
    body('start_point', 'Route start point is required').not().isEmpty(),
    body('single', 'Route single direction price should be number').isDecimal(),
    body('return', 'Route two-way direction price should be number').isDecimal(),
    body('end_point', 'Route end point is required').not().isEmpty(),
    body('name', 'Route name is required').not().isEmpty()
    // Retrieving a tour with request name and checking tour existence
        .custom(async (name, {req}) => {
            let route = await ferryRoutes.findOne({name: req.body.name});
            return !((route != null && !req.body._id));
        }).withMessage('Route name exists'),
    // body('start_point').not().isEmpty().withMessage('Tour latitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Tour latitude is invalid'),
    // body('end_point').not().isEmpty().withMessage('Tour longitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Tour longitude is invalid'),
    // body('partner_id', 'Tour partner is required').not().isEmpty(),
    // body('img').custom((img, {req}) => req.body.id || img).withMessage('Tour image is required'),

];

module.exports = {
    rules
};
