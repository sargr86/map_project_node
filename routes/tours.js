const router = express.Router();
const toursController = require('../controllers/toursController');
const validateTour = require('../validators/validateTour');

router.get('/get', toursController.get);
router.get('/get-partners', toursController.getPartners);

router.get('/getOne', checkAuth, checkRole('admin', 'partner'), toursController.getOne);
router.post('/add', checkAuth, checkRole('admin', 'partner'), uploadTourImg, validateTour.rules, toursController.add);
router.put('/update', checkAuth, checkRole('admin', 'partner'), uploadTourImg, validateTour.rules, toursController.update);
router.delete('/remove', checkAuth, checkRole('admin', 'partner'), toursController.remove);

module.exports = router;
