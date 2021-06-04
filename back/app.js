const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const app = express();
// models이 등록된 sequelize를 express에서 등록해주는 작업
// models/index.js
const db = require('./models');
const cors = require('cors');

// Promise
// server 구동시에 DB sequelize 연결도 같이 실행
db.sequelize.sync()
    .then(() => {
        console.log('db connection success');
    })
    .catch(console.error);

// cors
app.use(cors({
    origin: true,
    credentials: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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