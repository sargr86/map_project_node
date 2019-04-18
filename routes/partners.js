const router = express.Router();
const partnersController = require('../controllers/partnersController');
const validatePartner = require('../validators/validatePartner');
const validateLogin = require('../validators/validateLogin');

router.post('/login', validateLogin.rules, partnersController.login);
// router.use(checkAdmin);
router.get('/get', partnersController.get);
router.get('/getTypes', partnersController.getTypes);
router.get('/getOne', partnersController.getOne);
router.post('/add', uploadProfileImg,validatePartner.rules, partnersController.add);
router.put('/update', validatePartner.rules, partnersController.update);
router.delete('/remove', partnersController.remove);

module.exports = router;