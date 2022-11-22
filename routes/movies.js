const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth');

const { urlValidatorPattern } = require('../constants/constants');
const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', auth, getAllMovies);

router.post('/', auth, celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    image: Joi.string().required().pattern(urlValidatorPattern),
    trailerLink: Joi.string().required().pattern(urlValidatorPattern),
    thumbnail: Joi.string().required().pattern(urlValidatorPattern),
    owner: Joi.string().required().hex().length(24),
    movieId: Joi.string().required().hex().length(24),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.delete('/:movieId', auth, celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
