const router = express.Router();
const foodDrinkController = require('../controllers/foodDrinkController');
const validateFoodDrink = require('../validators/validateFoodDrink');

router.get('/get', foodDrinkController.get);
router.get('/get-partners', foodDrinkController.getPartners);
router.get('/getOne', foodDrinkController.getOne);
router.post('/add', uploadTourImg, validateFoodDrink.rules, foodDrinkController.add);
router.put('/update', uploadTourImg, validateFoodDrink.rules, foodDrinkController.update);
router.delete('/remove', foodDrinkController.remove);

module.exports = router;
