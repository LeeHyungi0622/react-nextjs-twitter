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
            done(null, user);
        } catch (error) {
            console.error(error);
            done(error);
        }
    });
    local();
}