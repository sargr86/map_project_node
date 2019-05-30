const router = express.Router();
const companiesController = require('../controllers/companiesController');
const validateCompany = require('../validators/validateCompany');

router.get('/get', companiesController.get);
router.get('/getOne', companiesController.getOne);
router.post('/add', validateCompany.rules, companiesController.add);
router.put('/update', validateCompany.rules, companiesController.update)
router.delete('/remove', companiesController.remove);

module.exports = router;
