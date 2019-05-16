const router = express.Router();
const partnersController = require('../controllers/partnersController');
const validatePartner = require('../validators/validatePartner');
const validateLogin = require('../validators/validateLogin');

router.post('/login', validateLogin.rules, partnersController.login);
router.get('/getTypes', partnersController.getTypes);

router.use(checkAuth);
router.get('/get', checkRole('admin'), partnersController.get);
router.get('/getOne', checkRole('admin', 'partner'), partnersController.getOne);
router.put('/update', checkRole('admin', 'partner'), validatePartner.rules, partnersController.update);
router.delete('/remove', checkRole('admin'), partnersController.remove);


// // @todo Check this two urls for deprecated
// router.post('/add', checkAdmin, uploadProfileImg, validatePartner.rules, partnersController.add);

module.exports = router;
