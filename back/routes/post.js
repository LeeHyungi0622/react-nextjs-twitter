const express = require('express');
const { Post } = require('../models');

const router = express.Router();

router.post('/', async(req, res) => {
    try {
        const post = await Post.create({
            content: req.body.content,
        });
        // successfully created
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.delete('/', (req, res) => {
    res.json({ id: 1, content: 'deleted' })
});

module.exports = router;