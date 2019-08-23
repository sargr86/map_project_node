const router = express.Router();
const toursController = require('../controllers/toursController');
const validateTourType = require('../validators/validateTourType');

router.get('/get', toursController.getTourTypes);
router.get('/getOne', checkAuth, toursController.getOneTourType);
router.post('/add', checkAuth, validateTourType.rules, toursController.addTourType);
router.put('/update', checkAuth, validateTourType.rules, toursController.updateTourType);
router.delete('/remove', checkAuth, toursController.removeTourType);

module.exports = router;
