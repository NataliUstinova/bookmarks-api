const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { updateUserValidation } = require('../middlewares/validation');
const {
  getUserInfo, updateUserInfo,
} = require('../controllers/users');

// роуты с авторизацией
router.get('/me', auth, getUserInfo);

router.patch('/me', auth, updateUserValidation, updateUserInfo);

module.exports = router;
