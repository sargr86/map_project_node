const router = express.Router();
const toursController = require('../controllers/toursController');
const validateTour = require('../validators/validateTour');

router.get('/get', toursController.get);
router.get('/get-dailies', toursController.getTourDailies);
router.get('/search-daily', toursController.getTourDailies);
router.get('/get-partners', toursController.getPartners);

router.get('/get-one', checkAuth, checkRole('admin', 'partner'), toursController.getOne);
router.post('/add', checkAuth, checkRole('admin', 'partner'), uploadImages, validateTour.rules, toursController.add);
router.post('/add-daily', checkAuth, checkRole('admin', 'partner'), validateTour.rules, toursController.addDaily);
router.put('/update', checkAuth, checkRole('admin', 'partner'), uploadImages, validateTour.rules, toursController.update);
router.put('/update-dates', checkAuth, checkRole('admin', 'partner'), toursController.updateDailyTourDates);
router.put('/update-daily', checkAuth, checkRole('admin', 'partner'), toursController.updateDailyTour);
router.put('/make-cover', checkAuth, checkRole('admin', 'partner'), toursController.makeCover);
router.delete('/remove', checkAuth, checkRole('admin', 'partner'), toursController.remove);
router.delete('/remove-image', checkAuth, checkRole('admin', 'partner'), toursController.removeImage);
router.delete('/remove-daily', checkAuth, checkRole('admin', 'partner'), toursController.removeDailyTour);

module.exports = router;
