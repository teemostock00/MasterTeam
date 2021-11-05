const connection = require('mysql');
const dotenv = require('dotenv');

// .env 파일 사용
dotenv.config({ path: './.env'})


// connection 설정 start
// .env 파일에 깃허브 푸쉬할때 보안때문에 설정해놓음
const db = connection.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
// 연결했을때 에러뜨면 콘솔에 띄워야 에러가 확인됨
db.connect( (error) => {
    if(error){
        console.log(error)
    } else{
        console.log("MYSQL Connected.....")
    }
});
// connection 설정 end

module.exports = db;
