const router = express.Router();
const accommodationsController = require('../controllers/accommodationsController');
const validateFoodDrink = require('../validators/validateFoodDrink');

router.get('/get', accommodationsController.get);
router.get('/get-partners', accommodationsController.getPartners);
router.get('/getOne', accommodationsController.getOne);
router.post('/add',validateFoodDrink.rules,accommodationsController.add);
router.put('/update', validateFoodDrink.rules, accommodationsController.update);
router.delete('/remove', accommodationsController.remove);

module.exports = router;