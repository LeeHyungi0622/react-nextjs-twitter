// 로그인 한 사용자가 다시 로그인을 하는경우
// 로그인 안한 사용자가 로그아웃을 시도하는 경우
// 위와 같은 경우를 사전에 방지하기 위해 middleware 작성

// 로그인 한 경우에만 다음 middleware로 진행
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.stataus(401).send('로그인이 필요합니다.');
    }
};

// 로그인 안한 경우에만 다음 middleware로 진행
exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.stataus(401).send('로그인 안한 사용자만 저');
    }
};