const passport = require('passport');
const local = require('./local');

module.exports = () => {
    passport.serializeUser((user, done) => {
        // cookie와 묶어 줄 user.id만 저장
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done) => {
        try {
            // cookie의 사용자 id 정보를 DB를 통해 전체 사용자 정보를 복구한다.
            const user = await User.findOne({ where: { id } })
                // 한 번 로그인한 이후에 router를 실행하게 되면, router가 실행되기 직전에
                // deserializeUser 부분이 실행되어 req.user를 통해 사용자 정보에 접근을 할 수 있게 된다. 
            done(null, user); // req.user
        } catch (error) {
            console.error(error);
            done(error);
        }
    });
    local();
}