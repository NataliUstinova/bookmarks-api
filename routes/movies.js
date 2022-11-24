const router = require('express').Router();
const { auth } = require('../middlewares/auth');

const { getUserMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');

router.get('/', auth, getUserMovies);

router.post('/', auth, createMovieValidation, createMovie);

router.delete('/:movieId', auth, deleteMovieValidation, deleteMovie);

module.exports = router;
