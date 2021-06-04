const express = require('express');
const router = express.Router();
// const db = require('../models');
const { User } = require('../models');
const bcrypt = require('bcrypt');

router.post('/', async(req, res, next) => {
    try {
        // 이메일 중복체크
        // 공식문서를 보고 비동기 함수인지 확인 후 사용
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });

        // 이미 있는 이메일이라면,
        if (exUser) {
            // 요청/응답은 헤더(상태, 용량, 시간, 쿠키)와 바디(데이터)로 구성이 되어있다.
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }

        // 10 ~ 13 : 높을수록 암호화가 좋아진다.(높은 숫자의 암호화는 시간이 오래걸린다.)
        const hashedPassword = await bcrypt.hash(req.body.passwordCheck, 12);
        // table 안에 데이터를 넣는 작업
        // 순서를 맞춰주기 위한 목적에서 async-await
        await User.create({
            // req.body는 
            email: req.body.email,
            nickname: req.body.nickname,
            // 암호화된 password
            password: hashedPassword,
        });
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3050');

        // table에 데이터 넣고 실행
        // 201: 잘 생성됨
        res.status(201).send('ok');
    } catch (error) {
        console.log(error);
        // next를 통해서 에러를 보내주게 되면, 
        // express가 알아서 browser로 에러를 보내준다.
        next(error);
    }
});

module.exports = router;