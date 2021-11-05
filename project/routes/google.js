const express = require('express');
const router = express.Router();

const db = require('./connection.js');
const path = require('path');
const cookieParser = require("cookie-parser");

// Google Auth start
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '328822197094-khiejtot9evtjn0tmd24b3ppo14io05e.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);
// Google Auth end


// <--                                 구글 로그인 start                                  -->
// login.ejs 렌더링
router.get('/login', (req, res) => {
    res.render('login')
    console.log('login');
});
router.post('/login', (req, res) => {
    let token = req.body.token;
    console.log(token);

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        console.log(payload);
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success');
        }).catch(console.error);
});
router.get('/index', (req, res) => {
    let user = req.user;
    res.render('index', {user});
});
// app.get('/protectedroute', (req, res) => {
//     res.render('protectedroute');
// });
function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
    }
    verify()
        .then(()=>{
            req.user = user;
            next();
        })
        .catch(err=>{
            res.redirect('/login')
        })
}
// <--                                 구글 로그인 end                                 -->

module.exports = router;
