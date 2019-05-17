const router = express.Router();
const authController = require('../controllers/authController');
const validateRegister = require('../validators/validateRegister');
const validateProfile = require('../validators/validateProfile');
const validateLogin = require('../validators/validateLogin');

router.post('/register', uploadProfileImg, validateRegister.rules, authController.register);
router.post('/login', validateLogin.rules, authController.login);

// router.use(checkAuth);

router.put('/update-profile', checkAuth,uploadProfileImg, validateProfile.rules, authController.updateProfile);
router.get('/get-profile', checkAuth,authController.getProfile);


module.exports = router;
