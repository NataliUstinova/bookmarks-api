const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');

// роуты, не требующие авторизации, регистрация и логин
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: false } }),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
}), login);

router.get('/signout', auth, (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

module.exports = router;
