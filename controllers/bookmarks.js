const Bookmark = require('../models/bookmark');
const { ERROR_MESSAGE, ERROR_NAME } = require('../constants/constants');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getUserBookmarks = (req, res, next) => {
  Bookmark.find({ owner: req.user._id })
    .then((bookmarks) => res.send(bookmarks))
    .catch(next);
};

module.exports.createBookmark = async (req, res, next) => {
  const {
    book_title,
    book_authors,
    content,
    comment,
    color,
    created_at,
    thumbnail
  } = req.body;

  try {
    // Check if a bookmark with the same book title and authors already exists
    const existingBookmark = await Bookmark.findOne({
      book_title,
      book_authors,
      content,
      comment,
      owner: req.user._id,
    });

    if (existingBookmark) {
      next(new BadRequestError('Bookmark already exists.'))
    } else {
      const bookmark = await Bookmark.create({
        book_title,
        book_authors,
        content,
        comment,
        color,
        created_at,
        thumbnail,
        owner: req.user._id,
      });

      res.send(bookmark);
    }
  } catch (e) {
    if (e.name === ERROR_NAME.VALIDATION) {
      next(new BadRequestError(ERROR_MESSAGE.BAD_REQUEST.MOVIE));
    } else {
      next(e);
    }
  }
};

module.exports.deleteBookmark = (req, res, next) => {
  const { bookmarkId } = req.params;
  Bookmark.findById(bookmarkId)
    .orFail(() => {
      throw new NotFoundError(ERROR_MESSAGE.NOT_FOUND.MOVIE);
    }).then((bookmark) => {
    if (bookmark.owner.toString() !== req.user._id) {
      throw new ForbiddenError(ERROR_MESSAGE.FORBIDDEN_ERROR);
    }
    return Bookmark.findByIdAndDelete(bookmarkId);
  }).then((bookmark) => res.send(bookmark))
    .catch((e) => {
      if (e.name === ERROR_NAME.CAST) {
        next(new BadRequestError(ERROR_MESSAGE.BAD_REQUEST.MOVIE_DELETE));
      } else {
        next(e);
      }
    });
};
