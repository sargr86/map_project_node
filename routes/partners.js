const router = express.Router();
const partnersController = require('../controllers/partnersController');

router.get('/get', partnersController.get);

module.exports = router;