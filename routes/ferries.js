const router = express.Router();
const ferriesController = require('../controllers/ferriesController');

router.get('/get', ferriesController.get);

module.exports = router;