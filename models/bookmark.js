const mongoose = require('mongoose');
const { urlValidatorPattern, ERROR_MESSAGE } = require('../constants/constants');

const bookmarkSchema = new mongoose.Schema({
  book_title: {
    type: String,
    required: true,
  },
  book_authors: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    required: false,
    default: Date.now,
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
  }
});

module.exports = mongoose.model('bookmark', bookmarkSchema);
