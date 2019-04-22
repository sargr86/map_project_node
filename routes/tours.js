const router = express.Router();
const toursController = require('../controllers/toursController');
const validateTour = require('../validators/validateTour');

router.get('/get', toursController.get);
router.get('/get-partners', toursController.getPartners);
router.get('/getOne', checkAdmin, toursController.getOne);
router.post('/add', checkAdmin, uploadTourImg, validateTour.rules, toursController.add);
router.put('/update', checkAdmin, uploadTourImg, validateTour.rules, toursController.update);
router.delete('/remove', checkAdmin, toursController.remove);

module.exports = router;