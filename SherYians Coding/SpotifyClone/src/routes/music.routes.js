const express = require('express');
const musicController = require('../controllers/music.controller');
const router = express.Router();
const authMiddlware  = require('../middleware/auth.middlware');
const multer = require('multer');

const upload = multer({
    storage:multer.memoryStorage()
})
router.post('/upload',authMiddlware.authArtist,upload.single("music"),musicController.createMusic);
router.post('/album',authMiddlware.authArtist,musicController.createAlbum);
router.get('/',authMiddlware.authUser,musicController.getAllMusics);
router.get('/album',authMiddlware.authUser,musicController.getAllAlbums);
router.get('/albums/:albumId',authMiddlware.authUser,musicController.getAlbumById);

module.exports = router; 