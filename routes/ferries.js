const router = express.Router();
const ferriesController = require('../controllers/ferriesController');
const validateFerry = require('../validators/validateFerry');

router.get('/get', ferriesController.get);
router.get('/get-partners', ferriesController.getPartners);

router.use(checkAuth);

router.get('/getOne', checkRole('admin', 'partner'), ferriesController.getOne);
router.post('/add', checkRole('admin', 'partner'), validateFerry.rules, ferriesController.add);
router.put('/update', checkRole('admin', 'partner'), validateFerry.rules, ferriesController.update);
router.delete('/remove', checkRole('admin', 'partner'), ferriesController.remove);

module.exports = router;
