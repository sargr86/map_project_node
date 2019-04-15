const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/get_places', homeController.get);


module.exports = router;