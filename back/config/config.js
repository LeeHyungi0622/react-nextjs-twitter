// json 파일에서는 dotenv를 사용할 수 없기 때문에 js파일로 변경
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    "development": {
        "username": "root",
        "password": process.env.DB_PASSWORD,
        "database": "react-nodebird",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": process.env.DB_PASSWORD,
        "database": "react-nodebird",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": process.env.DB_PASSWORD,
        "database": "react-nodebird",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}