const express = require('express');
const router = express.Router();
// const db = require('../models');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

// 일반 로그인인 경우 작성한 passport-local login 전략을 사용한다.
// 앞서 전략에서 작성한 done([서버 에러], [성공], [클라이언트 에러])가
// 아래의 callback 함수의 err, user, info로 넘어간다.

// 아래와 같이 middleware를 확장해서 작성할 수 있다.(next를 통해 에러를 전달하기 위해서)
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            // client error
            // 401: 허가되지 않음.
            return res.status(401).send(info.reason);
        }
        // passport login을 사용해서 로그인을 실행한다.
        return req.login(user, async(loginErr) => {
            //passport 로그인 에러발생 처리
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            // 이 지점에서 내부적으로 Cookie 정보를 header를 통해 전달한다.
            // res.setHeader('Cookie', 'cxlhy');

            // 최종 로그인 성공시, 사용자 정보를 프론트로 넘겨준다.
            return res.status(200).json(user);
        });
    })(req, res, next);
});

router.post('/logout', (req, res, next) => {
    // 로그인 된 상태에서는 req.user를 통해 로그인된 사용자 정보를 확인할 수 있다.
    // 게시글이나 댓글을 쓸때 사용된다.
    console.log(req.user);
    req.logout();
    // session, cookie 삭제
    req.session.destroy();
    res.send('ok');
});

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