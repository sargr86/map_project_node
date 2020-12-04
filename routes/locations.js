const router = express.Router();
const locationsController = require('../controllers/locationsController');


router.get('/get', locationsController.get);

module.exports = router;
