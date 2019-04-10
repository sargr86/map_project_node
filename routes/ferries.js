const router = express.Router();
const ferriesController = require('../controllers/ferriesController');
const validateFerry = require('../validators/validateFerry');

router.get('/get', ferriesController.get);
router.get('/getOne', ferriesController.getOne);
router.post('/add', validateFerry.rules, ferriesController.add);
router.put('/update',validateFerry.rules, ferriesController.update);
router.delete('/remove', ferriesController.remove);

module.exports = router;