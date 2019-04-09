const router = express.Router();
const ferriesController = require('../controllers/ferriesController');

router.get('/all_ferry', ferriesController.get);

module.exports = router;