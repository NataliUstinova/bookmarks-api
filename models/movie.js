const mongoose = require('mongoose');
const { urlValidatorPattern, ERROR_MESSAGE } = require('../constants/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlValidatorPattern.test(v);
      },
      message: (props) => `${props.value} ${ERROR_MESSAGE.INVALID_LINK}`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlValidatorPattern.test(v);
      },
      message: (props) => `${props.value} ${ERROR_MESSAGE.INVALID_LINK}`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlValidatorPattern.test(v);
      },
      message: (props) => `${props.value} ${ERROR_MESSAGE.INVALID_LINK}`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
