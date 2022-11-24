const { Joi, celebrate } = require('celebrate');
const { urlValidatorPattern } = require('../constants/constants');

const signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: false } }),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: false } }),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    description: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    image: Joi.string().required().pattern(urlValidatorPattern),
    trailerLink: Joi.string().required().pattern(urlValidatorPattern),
    thumbnail: Joi.string().required().pattern(urlValidatorPattern),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  signUpValidation,
  signInValidation,
  createMovieValidation,
  deleteMovieValidation,
  updateUserValidation,
};
