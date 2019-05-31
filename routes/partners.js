const router = express.Router();
const partnersController = require('../controllers/partnersController');
const validatePartner = require('../validators/validatePartner');
const validateLogin = require('../validators/validateLogin');
const validateInvite = require('../validators/validateInvite');

router.post('/login', validateLogin.rules, partnersController.login);
router.post('/invite', validateInvite.rules, partnersController.invite);
router.get('/getTypes', partnersController.getTypes);

router.get('/get', checkAuth,checkRole('admin'), partnersController.get);
router.get('/getOne', checkAuth,checkRole('admin', 'partner'), partnersController.getOne);
router.put('/update', checkAuth,checkRole('admin', 'partner'), validatePartner.rules, partnersController.update);
router.delete('/remove', checkAuth,checkRole('admin'), partnersController.remove);


// // @todo Check this two urls for deprecated
// router.post('/add', checkAdmin, uploadProfileImg, validatePartner.rules, partnersController.add);

module.exports = router;
