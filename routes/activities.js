const router = express.Router();
const activitiesController = require('../controllers/activitiesController');
const validateFoodDrink = require('../validators/validateFoodDrink');

router.get('/get', activitiesController.get);
router.get('/get-partners', activitiesController.getPartners);
router.get('/getOne', activitiesController.getOne);
router.post('/add',validateFoodDrink.rules,activitiesController.add);
router.put('/update', validateFoodDrink.rules, activitiesController.update);
router.delete('/remove', activitiesController.remove);

module.exports = router;