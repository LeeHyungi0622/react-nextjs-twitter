const express = require('express');
const { Post } = require('../models');

const router = express.Router();

router.post('/', async(req, res) => {
    try {
        const post = await Post.create({
            content: req.body.content,
        });
        // successfully created
        // json()으로 넘겨주는 데이터는 front에서 data로 접근한다.
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