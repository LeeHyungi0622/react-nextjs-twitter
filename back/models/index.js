const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
// config.json을 require [development]는 development에 해당하는 json 설정부분 호출
const config = require('../config/config')[env];

const db = {};

// sequelize가 node.js와 mysql을 연결해준다. 
// (sequelize가 내부적으로 mysql2를 사용)
// sequelize가 mysql2 driver에 아래 설정 속성들을 보내줘서 연결하게 된다. 
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 작성한 model들을 호출한다.
// model을 sequelize에 등록 
db.Comment = require('./comment')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Image = require('./image')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);

// associate 부분을 반복문으로 참조해서 연결시켜주는 부분이다.
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 여기까지 sequelize에 작성한 model들을 등록 완료

// 이제 express에서 sequelize를 등록해줘야 한다.

module.exports = db;