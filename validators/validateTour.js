require('../constants/sequelize');

const rules = [
    body('tours_type_id', 'Tour type is required').not().isEmpty(),
    body('locations').custom((item) => {
        let locations = JSON.parse(item);
        let invalidRoute = false;
        let startPoint = locations.find(l => l.title === 'Start');
        let endPoint = locations.find(l => l.title === 'End');
        let stop1 = locations.find(l => l.title === 'Stop 1');
        let stop2 = locations.find(l => l.title === 'Stop 2');


        switch (locations.length) {
            case 2:
                if (startPoint.id === endPoint.id) {
                    invalidRoute = true;
                    throw new Error('If route has only two points, they can\'t be with the same name');
                }
                break;
            case 3:
                console.log([startPoint.id, endPoint.id].includes(stop1.id))
                if ((new Set([startPoint.id, endPoint.id, stop1.id])).size === 1) {
                    invalidRoute = true;
                    throw new Error('The route can\'t have 3 equal points');
                } else if ([startPoint.id, endPoint.id].includes(stop1.id)) {
                    throw new Error('The first stop can\'t be equal to start or end points');
                }
                break;
            case 4:
                if ((new Set([startPoint.id, endPoint.id, stop1.id, stop2.id])).size === 1) {
                    invalidRoute = true;
                    throw new Error('The route can\'t have 4 equal points');
                } else if ([startPoint.id, endPoint.id].includes(stop1.id) || [startPoint.id, endPoint.id].includes(stop2.id)) {
                    throw new Error('The stop points can\'t be equal to start or end points');
                }
                break;
        }

        // Validate empty locations
        let emptyLocations = locations.find(l => !l.id);
        if (emptyLocations) {
            throw new Error('Please select 2-4 locations and make sure they\'re selected');
        }
        return true;
    }),
    body('start_date', 'Start date is required').not().isEmpty(),
    body('end_date', 'End date is required').not().isEmpty(),
    body('start_time', 'Start time is required').not().isEmpty(),
    body('end_time').not().isEmpty().withMessage('End time is required').custom((data, {req}) => {
        let d = req.body;
        if (d.start_date === d.end_date) {
            if (d.start_time === d.end_time) {
                throw new Error('If this is a one-day tour, it can\'t have equal start and end time values');
            }
        }
        return true;
    }),
    body('price', 'Price is required').not().isEmpty(),
    body('name', 'Tour name is required').not().isEmpty()
    // Retrieving a tour with request name and checking tour existence
        .custom(async (name, {req}) => {

            let partner = await Tours.findOne({where: {name: name}, attributes: ['name']});
            return !((partner != null && !req.body.id));
        }).withMessage('Tour name exists'),
    body('company_id', 'Tour partner company name is required').not().isEmpty(),
    // body('img').custom((img, {req}) => req.body.id || img).withMessage('Tour image is required'),

];

module.exports = {
    rules
};
