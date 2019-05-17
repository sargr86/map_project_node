const router = express.Router();
const toursController = require('../controllers/toursController');
const validateTour = require('../validators/validateTour');

router.get('/get', toursController.get);
router.get('/get-partners', toursController.getPartners);

router.use(checkAuth);

router.get('/getOne', checkRole('admin','partner'), toursController.getOne);
router.post('/add', checkRole('admin','partner'), uploadTourImg, validateTour.rules, toursController.add);
router.put('/update', checkRole('admin','partner'), uploadTourImg, validateTour.rules, toursController.update);
router.delete('/remove', checkRole('admin','partner'), toursController.remove);

module.exports = router;
