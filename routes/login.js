const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { MESSAGE } = require('../constants/constants');
const { signUpValidation, signInValidation } = require('../middlewares/validation');

// роуты, не требующие авторизации, регистрация и логин
router.post('/signup', signUpValidation, createUser);
router.post('/signin', signInValidation, login);

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: MESSAGE.EXIT });
});

module.exports = router;
