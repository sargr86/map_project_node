const router = express.Router();
const chatController = require('../controllers/chatController');


// router.post('/login', validateLogin.rules, customersController.login);
router.get('/load-messages', chatController.getMessages);
// router.get('/getTypes', customersController.getTypes);
// router.get('/getOne', checkAdmin, employeesController.getOne);
// router.post('/add', checkAdmin, uploadProfileImg, validatePartner.rules, employeesController.add);
// router.put('/update', checkAdmin, validatePartner.rules, employeesController.update);
// router.delete('/remove', checkAdmin, employeesController.remove);
// router.post('/invite', validateInvite.rules, employeesController.invite)

module.exports = router;
