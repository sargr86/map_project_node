const router = express.Router();
const accommodationsController = require('../controllers/accommodationsController');
const validateAccommodation = require('../validators/validateAccommodation');

router.get('/get', accommodationsController.get);
router.get('/get-partners', accommodationsController.getPartners);
router.get('/getOne', accommodationsController.getOne);
router.post('/add', uploadTourImg, validateAccommodation.rules, accommodationsController.add);
router.put('/update', uploadTourImg, validateAccommodation.rules, accommodationsController.update);
router.delete('/remove', accommodationsController.remove);

module.exports = router;
