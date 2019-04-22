const router = express.Router();
const foodDrinkController = require('../controllers/foodDrinkController');
const validateTourType = require('../validators/validateTourType');

router.get('/get', foodDrinkController.get);
// router.get('/getOne', toursController.getOneTourType);
// router.post('/add',validateTourType.rules,toursController.addTourType);
// router.put('/update', validateTourType.rules, toursController.updateTourType);
// router.delete('/remove', toursController.removeTourType);

module.exports = router;