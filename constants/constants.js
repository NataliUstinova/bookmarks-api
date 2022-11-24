const ERROR_NAME = {
  CAST: 'CastError',
  VALIDATION: 'ValidationError',
};

const MESSAGE = {
  AUTH_SUCCESS: 'Авторизация прошла успешно',
  JWT_SAVED: 'Токен сохранен',
  EXIT: 'Выход',
};

const ERROR_MESSAGE = {
  NOT_FOUND: {
    PAGE: 'Страница не найдена.',
    USER: 'Пользователь с указанным _id не найден.',
    MOVIE: 'Фильм с указанным _id не найдена.',
  },
  BAD_REQUEST: {
    MOVIE: 'Переданы некорректные данные при создании фильма.',
    MOVIE_DELETE: 'Переданы некорректные данные при удалении фильма.',
    USER_CREATE: 'Переданы некорректные данные при создании пользователя.',
    USER_UPDATE: 'Переданы некорректные данные при обновлении профиля.',
  },
  AUTH_ERROR: 'Необходима авторизация',
  DEFAULT_ERROR: 'На сервере произошла ошибка.',
  EMAIL_EXIST_ERROR: 'Пользователь с данным email уже существует',
  FORBIDDEN_ERROR: 'Нельзя удалять чужие фильмы',
  INVALID_LINK: 'Невалидная ссылка',
  INVALID_EMAIL: 'Невалидный email',
  EMAIL_OR_PASS: 'Неправильные почта или пароль',
};

const devBaseUrl = 'mongodb://127.0.0.1:27017/moviesdb';
const devSecret = 'strongest-key-ever';
const urlValidatorPattern = /^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

module.exports = {
  ERROR_MESSAGE, ERROR_NAME, MESSAGE, urlValidatorPattern, devSecret, devBaseUrl,
};
