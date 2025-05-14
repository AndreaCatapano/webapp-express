const express = require('express');
const router = express.Router();
const moviesController = require('../controller/moviesController.js')

router.get('/', moviesController.getAllMovies);
router.get('/:id', moviesController.showMovie);
router.post('/:id', moviesController.createReview);

module.exports = router;
