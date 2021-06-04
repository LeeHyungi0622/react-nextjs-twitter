module.exports = (sequelize, DataTypes) => {
    // User : model name (자동으로 mysql에서는 users로 변환된다.)
    // (소문자로 변환되고 복수 이름으로 변환된다)
    const User = sequelize.define('User', {
        // id가 기본적으로 들어간다.
        // column 정보
        // 내부의 데이터들을 row 정보
        email: {
            // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            type: DataTypes.STRING(30),
            allowNull: false, // 필수
            unique: true,
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password: {
            // PASSWORD는 암호화를 하게 되면 길이가 늘어나기 때문에 100
            type: DataTypes.STRING(100),
            allowNull: false, // 필수
        },
    }, {
        // 두번째 객체는 User model에 대한 setting을 넣어준다.
        charset: 'utf8',
        collate: 'utf8_general_ci', //한글 저장
    });
    User.associate = (db) => {
        // User: Post = 1: N
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        // 사용자 - 좋아요 (through를 통해 중간 테이블 이름 지정)
        // 별칭의 시작은 대문자로 작성
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
        // foreign key 
        // 같은 테이블 간의 중간 테이블을 생성하는 경우, foreign key로 key 이름을 바꿔준다.
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
    };
    return User;
};