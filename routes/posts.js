const express = require('express');
const router = express.Router();

const db = require('../data/db');

// @route   GET /api/posts
// @desc    Returns an array of all the post objects contained in the database.
router.get('/', async (req, res) => {
    try {
        const posts = await db.find();
        res.json(posts);
    } catch(err) {
        res.status(500).json({ error: 'The posts information could not be retrieved.'});
    }
});

// @route   POST /api/posts
// @desc    Creates a post using the information sent inside the request body.
router.post('/', async (req, res) => {
    try {
        const { title, contents } = req.body;

        if (!title || !contents) {
            return res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
        }

        const response = await db.insert({ title, contents });
        const createdPost = await db.findById(response.id);
        res.status(201).json(createdPost[0]);
    } catch(err) {
        res.status(500).json({ error: 'There was an error while saving the post to the database' });
    }
});

// @route   GET /api/posts/:id
// @desc    Returns the post object with the specified id.
router.get('/:id', async (req, res) => {
    try {
        const post = await db.findById(req.params.id);
        if (post.length === 0) {
            return res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }

        res.json(post[0]);
    } catch(err) {
        res.status(500).json({ error: 'The post information could not be retrieved.' });
    }
});

// @route   DELETE /api/posts/:id
// @desc    Removes the post with the specified id and returns the deleted post object. 
router.delete('/:id', async (req, res) => {
    try {
        const post = await db.findById(req.params.id);
        if (post.length === 0) {
            return res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }

        await db.remove(post[0].id);
        res.json(post[0]);
    } catch(err) {
        res.status(500).json({ error: 'The post could not be removed.' });
    }
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