const router = express.Router();
const accommodationsController = require('../controllers/accommodationsController');
const validateAccommodation = require('../validators/validateAccommodation');

router.get('/get', accommodationsController.get);
router.get('/get-partners', accommodationsController.getPartners);
router.get('/getOne', accommodationsController.getOne);
router.post('/add',validateAccommodation.rules,accommodationsController.add);
router.put('/update', validateAccommodation.rules, accommodationsController.update);
router.delete('/remove', accommodationsController.remove);

module.exports = router;