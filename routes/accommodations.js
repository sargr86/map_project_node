const router = express.Router();
const accommodationsController = require('../controllers/accommodationsController');
const validateAccommodation = require('../validators/validateAccommodation');

router.get('/get', accommodationsController.get);
router.get('/get-partners', accommodationsController.getPartners);
router.get('/getOne', accommodationsController.getOne);
router.get('/get-by-address', accommodationsController.getByAddress);
router.get('/get-orders', accommodationsController.getOrders);
router.get('/get-client-orders', accommodationsController.getClientOrders);
router.post('/add', uploadImages, validateAccommodation.rules, accommodationsController.add);
router.put('/update', uploadImages, validateAccommodation.rules, accommodationsController.update);
router.put('/make-cover', checkAuth, checkRole('admin', 'partner'), accommodationsController.makeCover);
router.delete('/remove', accommodationsController.remove);
router.delete('/remove-image', accommodationsController.removeImage);

module.exports = router;
