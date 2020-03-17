const rules = [
    body('startPoint').not().isEmpty().withMessage('Start point is required')
        .custom(async (startPoint, {req}) => {
            console.log('here')

            if(!startPoint.name) {
                throw new Error('Please select start point location');
            }

            // // Retrieving a ferry with request name
            // let partner = await Ferries.findOne({
            //     where: {name: name}, attributes: ['name']
            // });
            // return !((partner != null && !req.body.id));
        }),
    body('endPoint').not().isEmpty().withMessage('End point is required')
        .custom(async (name, {req}) => {
            // // Retrieving a ferry with request name
            // let partner = await Ferries.findOne({
            //     where: {name: name}, attributes: ['name']
            // });
            // return !((partner != null && !req.body.id));
        }).withMessage('Ferry name exists'),

    // body('lat').not().isEmpty().withMessage('Latitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Latitude is invalid'),
    // body('lng').not().isEmpty().withMessage('Longitude is required').custom((lat) => validatePattern(lat, 'lat')).withMessage('Longitude is invalid'),
    body('payment').not().isEmpty().withMessage('Payment is required'),
    body('time').not().isEmpty().withMessage('Time is required'),
    body('wayType').not().isEmpty().withMessage('Way type is required'),
    body('more').custom((company_id, {req}) => {
        // if (req.decoded.role.name_en.toLocaleLowerCase() === 'admin' && !req.body.company_id) {
        //     throw new Error('Company is required');
        // }
        return true;
    }),
];

module.exports = {
    rules
};
