const router = express.Router();
const employeesController = require('../controllers/employeesController');
const validatePartner = require('../validators/validatePartner');
const validateLogin = require('../validators/validateLogin');
const validateInvite = require('../validators/validateInvite');

router.post('/login',checkAuth, validateLogin.rules, employeesController.login);
router.get('/get', employeesController.get);
router.get('/getTypes', employeesController.getTypes);
router.get('/getOne', checkAdmin, employeesController.getOne);
router.post('/add',checkAuth, checkAdmin, uploadProfileImg, validatePartner.rules, employeesController.add);
router.put('/update',checkAuth, checkAdmin, validatePartner.rules, employeesController.update);
router.delete('/remove', checkAuth,checkAdmin, employeesController.remove);
router.post('/invite',checkAuth, validateInvite.rules, employeesController.invite)

module.exports = router;
