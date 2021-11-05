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

const google = require('./routes/google.js');
app.use('/google', google);
const map = require('./routes/map.js')
app.use('/map', map);
const drink = require('./routes/drink.js');
app.use('/drink', drink);
const router = require('./routes/router.js');
app.use('/router', router);


app.get('/introduction', (req, res) => {
    res.render('introduction')
    console.log('introduction');
});






// Port = 3000번
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
