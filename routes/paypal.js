const router = express.Router();
const usersController = require('../controllers/usersController');


router.get('/order-via-paypal', usersController.payViaPaypal);
router.get('/paypal-success', usersController.paypalPaymentSuccess);

module.exports = router;