// login 전략
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
    //(객체, 함수)
    passport.use(new LocalStrategy({
        //req.body.email
        usernameField: 'email',
        // req.body.password
        passwordField: 'password'
    }, async(email, password, done) => {
        // 로그인 전략
        try {
            const user = await User.findOne({
                where: { email }
            });
            // user가 존재하지 않는 경우
            if (!user) {
                // 서버에러, 성공, 클라이언트 에러
                return done(null, false, { reason: '존재하지 않는 사용자입니다.' })
            }
            // user가 존재하는 경우, 비밀번호 체크
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                // 비밀번호가 일치하는 경우, 서버에 user 정보를 보내준다.
                return done(null, user)
            }
            // password가 일치하지 않는 경우
            return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
        } catch (error) {
            console.error(error);
            return done(error);
        }
    }));
};