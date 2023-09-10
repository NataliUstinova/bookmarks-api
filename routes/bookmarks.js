const router = require('express').Router();
const { auth } = require('../middlewares/auth');

const { getUserBookmarks, createBookmark, deleteBookmark } = require('../controllers/bookmarks');
const { createBookmarkValidation, deleteBookmarkValidation } = require('../middlewares/validation');

router.get('/', auth, getUserBookmarks);

router.post('/', auth, createBookmarkValidation, createBookmark);

router.delete('/:bookmarkId', auth, deleteBookmarkValidation, deleteBookmark);

module.exports = router;
