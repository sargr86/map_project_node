const router = express.Router();
const toursController = require('../controllers/toursController');
const validateTourType = require('../validators/validateTourType');

router.get('/get', toursController.getTourTypes);
router.get('/getOne', toursController.getOneTourType);
router.post('/add',validateTourType.rules,toursController.addTourType);
router.put('/update', validateTourType.rules, toursController.updateTourType);
router.delete('/remove', toursController.removeTourType);

module.exports = router;