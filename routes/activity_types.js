const router = express.Router();
const activitiesController = require('../controllers/activitiesController');
const validateActivityType = require('../validators/validateActivityType');

router.get('/get', activitiesController.getActivityTypes);
router.get('/getOne', activitiesController.getOneActivityType);
router.get('/get-subtypes', activitiesController.getSubtypes);
router.get('/get-single-subtype', activitiesController.getSingleSubtype);
router.post('/add',validateActivityType.rules,activitiesController.addActivityType);
router.put('/update', validateActivityType.rules, activitiesController.updateActivityType);
router.delete('/remove', activitiesController.removeActivityType);
module.exports = router;