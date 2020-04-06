const express = require('express');
const router = express.Router();

// @route   GET /api/posts
// @desc    Returns an array of all the post objects contained in the database.
router.get('/', (req, res) => {

});

// @route   POST /api/posts
// @desc    Creates a post using the information sent inside the request body.
router.post('/', (req, res) => {

});

// @route   GET /api/posts/:id
// @desc    Returns the post object with the specified id.
router.get('/:id', (req, res) => {

});

// @route   DELETE /api/posts/:id
// @desc    Removes the post with the specified id and returns the deleted post object. 
router.delete('/:id', (req, res) => {

});

// @route   PUT /api/posts/:id
// @desc    Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put('/:id', (req, res) => {

});

// @route   GET /api/posts/:id/comments
// @desc    Returns an array of all the comment objects associated with the post with the specified id.
router.get('/:id', (req, res) => {

});

// @route   POST /api/posts/:id/comments
// @desc    Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/:id', (req, res) => {

});

module.exports = router;