const express = require('express');
const router = express.Router();

const db = require('../data/db');

const formateDate = date => {
    const year = date.getFullYear();
    const month = (((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1));
    const day = ((date.getDate() < 10 ? '0' : '') + date.getDate());
    const hour = ((date.getHours() < 10 ? '0' : '') + date.getHours());
    const minutes = ((date.getMinutes() < 10 ? '0' : '') + date.getMinutes());
    const seconds = ((date.getSeconds() < 10 ? '0' : '') + date.getSeconds());

    // "2019-05-11 01:55:52"
    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}

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
router.put('/:id', async (req, res) => {
    try {
        const post = await db.findById(req.params.id);
        if (post.length === 0) {
            return res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
    
        const { title, contents } = req.body;
        if (!title || !contents ) {
            return res.status(400).json({ errorMessage: 'Please provide title and contents for the post' });
        }
        
        const updatedPostsNumber = await db.update(
            post[0].id,
            { 
                title,
                contents,
                updated_at: formateDate(new Date()) 
            }
        );

        if (updatedPostsNumber !== 1) {
            return res.status(500).json({ error: 'There was an error updating the post.' });
        }

        const updatedPost = await db.findById(post[0].id);
        res.json(updatedPost[0]);
    } catch(err) {
        res.status(500).json({ error: 'The post information could not be modified.' });
    }
});

// @route   GET /api/posts/:id/comments
// @desc    Returns an array of all the comment objects associated with the post with the specified id.
router.get('/:id/comments', async (req, res) => {
    try {
        const post = await db.findById(req.params.id);
        if (post.length === 0) {
            return res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }

        const comments = await db.findPostComments(post[0].id);
        res.json(comments);
    } catch(err) {
        res.status(500).json({ error: 'The comments information could not be retrieved.' });
    }
});

// @route   POST /api/posts/:id/comments
// @desc    Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/:id/comments', async (req, res) => {
    try {
        const post = await db.findById(req.params.id);
        if (post.length === 0) {
            return res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }

        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ errorMessage: 'Please provide text for the comment.' });
        }

        const newComment = {
            text,
            post_id: post[0].id
        }

        const idObj = await db.insertComment(newComment);
        const createdComment = await db.findCommentById(idObj.id);

        res.status(201).json(createdComment);
    } catch(err) {
        res.status(500).json({ error: 'There was an error while saving the comment to the database.' });
    }
});

module.exports = router;