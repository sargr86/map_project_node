const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/getById',usersController.getUserById);
router.get('/get-by-role',usersController.getUsersByRole);
router.get('/get',usersController.getUsers);
router.put('/change-status',usersController.changeUserStatus);
router.post('/create-stripe-user-card', usersController.createStripeUserCard);
router.post('/create-stripe-user', usersController.createStripeUser);
router.get('/get-customer-cards',usersController.getCustomerCards);
router.delete('/remove-customer-card',usersController.removeStripeCard);
router.put('/update-customer-card',usersController.updateStripeCard);
router.get('/get-customer-info',usersController.getCustomerInfo);
router.put('/set-customer-card-as-default',usersController.setCardAsDefault);


module.exports = router;
