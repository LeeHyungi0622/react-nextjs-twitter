module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag', {
        // id가 기본적으로 들어간다.
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    }, {
        // 두번째 객체는 Hashtag model에 대한 setting을 넣어준다.
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', //한글 저장
    });
    Hashtag.associate = (db) => {
        // 다대다 N:N
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
    };
    return Hashtag;
};