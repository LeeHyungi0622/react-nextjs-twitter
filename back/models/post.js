module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        // id가 기본적으로 들어간다.
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        // 두번째 객체는 Post model에 대한 setting을 넣어준다.
        // mb4 : 이모티콘 포함을 위해
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', //한글 저장
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        // 다대다 관계 (N:N)
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        // 사용자 - 좋아요 (through를 통해 중간 테이블 이름 지정)
        // 아래와같이 as로 지정해주면, 
        // post.getLikers 로 게시글 좋아요 누른 사람에 대한 정보를 가져올 수 있다.
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
        // RetweetId 생성
        db.Post.belongsTo(db.Post, { as: 'Retweet' });
    };
    return Post;
};