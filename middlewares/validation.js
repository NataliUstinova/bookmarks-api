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

const createBookmarkValidation = celebrate({
  body: Joi.object().keys({
    book_title: Joi.string().required(),
    book_authors: Joi.string().required(),
    content: Joi.string().required(),
    comment: Joi.string().allow(null, ''),
    color: Joi.string().allow(null, ''),
    thumbnail: Joi.string().required().pattern(urlValidatorPattern),
    created_at: Joi.date(),
  }),
});

const deleteBookmarkValidation = celebrate({
  params: Joi.object().keys({
    bookmarkId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  signUpValidation,
  signInValidation,
  createBookmarkValidation,
  deleteBookmarkValidation,
  updateUserValidation,
};
