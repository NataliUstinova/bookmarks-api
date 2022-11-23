const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth');

const {
  getUserInfo, updateUserInfo,
} = require('../controllers/users');

// роуты с авторизацией
router.get('/me', auth, getUserInfo);

router.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: false } }),
  }),
}), updateUserInfo);

module.exports = router;
