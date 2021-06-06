const express = require('express');
const { Post, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn, async(req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            // 로그인 한 후에는 deserialize를 통해 복구된 사용자 정보를 
            // req.user를 통해 접근이 가능하다.
            UserId: req.user.id,
        });
        // successfully created 
        // json()으로 넘겨주는 데이터는 front에서 data로 접근한다.
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 주소부분에서 동적으로 바뀌는 부분 param
router.post('/:postId/comment', isLoggedIn, async(req, res, next) => {
    try {
        //철저하게 comment를 달려는 post가 존재하는지 검사를 해야한다.
        const post = await Post.findOne({
            where: { id: req.params.postId }
        });
        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        const comment = await Comment.create({
            content: req.body.content,
            // url로부터 받은 값이기 때문에 params를 통해 값에 접근한다.
            PostId: req.params.postId,
            UserId: req.user.id,
        })
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.delete('/', (req, res) => {
    res.json({ id: 1, content: 'deleted' })
});

module.exports = router;