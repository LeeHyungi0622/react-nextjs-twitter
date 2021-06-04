const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const app = express();
// models이 등록된 sequelize를 express에서 등록해주는 작업
// models/index.js
const db = require('./models');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passportConfig = require('./passport');
const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config();

// Promise
// server 구동시에 DB sequelize 연결도 같이 실행
db.sequelize.sync()
    .then(() => {
        console.log('db connection success');
    })
    .catch(console.error);

// passport configuration
passportConfig();
// cors
app.use(cors({
    origin: true,
    credentials: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// session의 secret을 cookieParser에서도 동일하게 넣어준다. 
// cookie의 랜덤한 문자열을 생성할때 사용할 문자열 
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    // cookie에 랜덤한 문자열이 데이터를 기반으로 만들어낸 문자열이다.
    // secret이 해킹당하게 되면, 데이터가 노출될 수 있다. 
    secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('hello api');
});

app.get('/posts', (req, res) => {
    // back-end개발자와 협의를 해서 어떤 데이터 형태로 보내줄지 알아야 한다.
    res.json([
        { id: 1, content: 'hello1' },
        { id: 2, content: 'hello2' },
        { id: 3, content: 'hello3' },
    ]);
});

// postRouter 하위의 경로에 /post로 prefix를 붙여준다.
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
    console.log('Server is running');
});