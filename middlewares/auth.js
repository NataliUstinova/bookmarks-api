const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');
const { ERROR_MESSAGE, devSecret } = require('../constants/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  let payload;
  // Чтобы отловить ошибки оборачиваем в try-catch
  try {
    const token = req.cookies.jwt;
    // Вытаскиваем айди из токена
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devSecret);
  } catch (err) {
    next(new AuthError(ERROR_MESSAGE.AUTH_ERROR));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
