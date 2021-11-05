const express = require("express");
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs')
const dotenv = require('dotenv');
const db = require('./routes/connection');
const cookieParser = require("cookie-parser");
const cors = require('cors');

dotenv.config({ path: './.env'})

//ejs 사용
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// 순서대로 경로 연결
// http://localhost:3000/login
// http://localhost:3000/join
const google = require('./routes/google.js');
app.use('/', google);


// POSTMAN GET POST (암호화 아이디 비번 회원가입 로그인 가능)
// http://localhost:3000/api/join
// http://localhost:3000/api/login
const router = require('./routes/router.js');
app.use('/api', router);

// http://localhost:3000/index
const index = require('./routes/index.js');
app.use('/index', index);


// http://localhost:3000/introduction
const introduction = require('./routes/introduction.js');
app.use('/introduction', introduction);


// http://localhost:3000/map/
const map = require('./routes/map.js')
app.use('/map', map);


// http://localhost:3000/drink/page=1
const drink = require('./routes/drink.js');
app.use('/drink', drink);


// http://localhost:3000/community
const community = require('./routes/community.js');
app.use('/community', community);


// 이거 안나와 좆됨
// http://localhost:3000/community/write
app.get('./community/write', (req, res) => {
    res.render('communitywrite');
    console.log('communitywrite 접속');
});






// Port = 3000번
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
