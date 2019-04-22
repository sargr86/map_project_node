const router = express.Router();
const partnersController = require('../controllers/partnersController');
const validatePartner = require('../validators/validatePartner');
const validateLogin = require('../validators/validateLogin');

router.post('/login', validateLogin.rules, partnersController.login);
router.get('/get',checkAdmin, partnersController.get);
router.get('/getTypes', partnersController.getTypes);
router.get('/getOne',checkAdmin, partnersController.getOne);
router.post('/add',checkAdmin, uploadProfileImg,validatePartner.rules, partnersController.add);
router.put('/update',checkAdmin, validatePartner.rules, partnersController.update);
router.delete('/remove',checkAdmin, partnersController.remove);

module.exports = router;