const router = express.Router();
const employeesController = require('../controllers/employeesController');
const validatePartner = require('../validators/validatePartner');
const validateLogin = require('../validators/validateLogin');

router.post('/login', validateLogin.rules, employeesController.login);
router.get('/get', employeesController.get);
router.get('/getTypes', employeesController.getTypes);
router.get('/getOne',checkAdmin, employeesController.getOne);
router.post('/add',checkAdmin, uploadProfileImg,validatePartner.rules, employeesController.add);
router.put('/update',checkAdmin, validatePartner.rules, employeesController.update);
router.delete('/remove',checkAdmin, employeesController.remove);
router.post('/invite', employeesController.invite)

module.exports = router;
