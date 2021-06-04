module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        // id가 기본적으로 들어간다.
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        // 두번째 객체는 Comment model에 대한 setting을 넣어준다.
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', //한글 저장
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment;
};