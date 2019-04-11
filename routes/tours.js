const router = express.Router();
const toursController = require('../controllers/toursController');
const validateTour = require('../validators/validateTour');

router.get('/get', toursController.get);
router.get('/getOne', toursController.getOne);
router.post('/add',uploadTourImg, validateTour.rules,toursController.add);
router.put('/update',uploadTourImg, validateTour.rules, toursController.update);
router.delete('/remove', toursController.remove);

module.exports = router;