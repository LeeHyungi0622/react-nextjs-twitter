module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        // id가 기본적으로 들어간다.
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        // 두번째 객체는 Image model에 대한 setting을 넣어준다.
        charset: 'utf8',
        collate: 'utf8_general_ci', //한글 저장
    });
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };
    return Image;
};