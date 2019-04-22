const router = express.Router();
const ferriesController = require('../controllers/ferriesController');
const validateFerry = require('../validators/validateFerry');

router.get('/get', ferriesController.get);
router.get('/get-partners', ferriesController.getPartners);
router.get('/getOne',checkAdmin, ferriesController.getOne);
router.post('/add',checkAdmin, validateFerry.rules, ferriesController.add);
router.put('/update',checkAdmin,validateFerry.rules, ferriesController.update);
router.delete('/remove',checkAdmin, ferriesController.remove);

module.exports = router;