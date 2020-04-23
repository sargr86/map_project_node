const router = express.Router();
const ferriesController = require('../controllers/ferriesController');
const validateFerry = require('../validators/validateFerry');

router.get('/get', ferriesController.get);
router.get('/get-partners', ferriesController.getPartners);

router.get('/getOne',  ferriesController.getOne);
router.post('/add', checkAuth, checkRole('admin', 'partner'), uploadImages, validateFerry.rules, ferriesController.add);
router.put('/update', checkAuth, checkRole('admin', 'partner'), uploadImages, validateFerry.rules, ferriesController.update);
router.put('/make-cover', checkAuth, checkRole('admin', 'partner'), ferriesController.makeCover);
router.put('/assign-driver', checkAuth, checkRole('admin', 'partner'), ferriesController.assignDriver);
router.delete('/remove', checkAuth, checkRole('admin', 'partner'), ferriesController.remove);
router.delete('/remove-image', checkAuth, checkRole('admin', 'partner'), ferriesController.removeImage);
// router.delete('/remove-image', ferriesController.removeImage);

router.get('/get_real_locations', ferriesController.getRealLocations);
router.get('/get-directions', ferriesController.getFerriesDirections);
router.get('/get-directions-pricing', ferriesController.getFerriesDirectionsPrices);
router.get('/get-direction-price', ferriesController.getFerryDirectionPrice);

module.exports = router;
