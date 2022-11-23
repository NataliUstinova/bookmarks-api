const Movie = require('../models/movie');
const { ERROR_MESSAGE, ERROR_NAME } = require('../constants/constants');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    description,
    director,
    duration,
    year,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    description,
    director,
    duration,
    year,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((e) => {
      if (e.name === ERROR_NAME.VALIDATION) {
        next(new BadRequestError(ERROR_MESSAGE.BAD_REQUEST.MOVIE));
      } else {
        next(e);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError(ERROR_MESSAGE.NOT_FOUND.MOVIE);
    }).then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалять чужие фильмы');
      }
      return Movie.findByIdAndDelete(movieId);
    }).then((movie) => res.send(movie))
    .catch((e) => {
      if (e.name === ERROR_NAME.CAST) {
        next(new BadRequestError(ERROR_MESSAGE.BAD_REQUEST.MOVIE_DELETE));
      } else {
        next(e);
      }
    });
};
