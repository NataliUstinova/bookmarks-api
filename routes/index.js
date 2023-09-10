const router = require('express').Router();

const userRouter = require('./users');
const bookmarkRouter = require('./bookmarks');
const loginRouter = require('./login');
const NotFoundError = require('../errors/not-found-err');
const { ERROR_MESSAGE } = require('../constants/constants');
const { auth } = require('../middlewares/auth');

router.use(loginRouter);
router.use('/users', userRouter);
router.use('/bookmarks', bookmarkRouter);

router.use('*', auth, (req, res, next) => { next(new NotFoundError(ERROR_MESSAGE.NOT_FOUND.PAGE)); });

module.exports = router;
