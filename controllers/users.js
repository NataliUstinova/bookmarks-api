const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const EmailExistError = require('../errors/email-exist-err');
const {
  ERROR_MESSAGE, ERROR_NAME, MESSAGE, devSecret,
} = require('../constants/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name, email: user.email,
    }))
    .catch((e) => {
      if (e.code === 11000) {
        next(new EmailExistError(ERROR_MESSAGE.EMAIL_EXIST_ERROR));
      } else if (e.name === ERROR_NAME.VALIDATION) {
        next(new BadRequestError(ERROR_MESSAGE.BAD_REQUEST.USER_CREATE));
      } else {
        next(e);
      }
    });
};

module.exports.getUserInfo = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError(ERROR_MESSAGE.NOT_FOUND.USER);
      }
    })
    .catch((e) => {
      if (e.name === ERROR_NAME.VALIDATION || e.name === ERROR_NAME.CAST) {
        next(new BadRequestError(ERROR_MESSAGE.BAD_REQUEST.USER_UPDATE));
      } else if (e.code === 11000) {
        next(new EmailExistError(ERROR_MESSAGE.EMAIL_EXIST_ERROR));
      } else {
        next(e);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : devSecret, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).send({ message: MESSAGE.JWT_SAVED });
    })
    .catch((e) => {
      if (e.name === ERROR_NAME.VALIDATION || e.name === ERROR_NAME.CAST) {
        next(new BadRequestError(ERROR_MESSAGE.BAD_REQUEST.USER_UPDATE));
      } else if (e.code === 11000) {
        next(new EmailExistError(ERROR_MESSAGE.EMAIL_EXIST_ERROR));
      } else {
        next(e);
      }
    });
};
