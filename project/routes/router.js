
// 로그인 회원가입 담당
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const db = require('./connection.js');
const userMiddleware = require('../middleware/users.js');
const {render} = require("ejs");

router.get('/join',(req,res,next)=>{
    res.render('join');
});
// http://localhost:3000/sign-up
router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {

    const sql = `SELECT id
              FROM users
              WHERE LOWER(username) = LOWER(${req.body.username})`

    db.query(sql, (err, result) => {
            if (result && result.length) { // error
                return res.status(409).send({
                    message: 'This username is already in use!'
                })
            } else { // username not in use => password hash값 반환
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            message: err
                        });
                    } else {
                        db.query(`INSERT INTO users (id, username, password, registered, user_nick, user_phone, user_national, user_img)
                                  VALUES ('${uuid.v4()}', ${db.escape(req.body.username)}, '${hash}', now(), ?, ?, ?, ?);`, [req.body.user_nick,req.body.user_phone, req.body.user_national, req.body.user_img],
                            (err, result) => {
                                if (err) {
                                    throw err;
                                    return res.status(400).send({
                                        message: err,
                                    });
                                }
                                return res.status(201).send({
                                    message: "Registered",

                                })
                            }
                        );
                    }
                });
            }
        }
    );
});

// http://localhost:3000/api/login
router.post('/login', (req, res, next) => {
    db.query(`SELECT *
              FROM users
              WHERE username = ${db.escape(req.body.username)}`, (err, result) => {
            if (err) {
                throw err;
                return res.status(400).send({
                    message: err,
                });
            }
            if (!result.length) {
                return res.status(400).send({
                    message: "Username or password incorrect!"
                });
            }

            bcrypt.compare(req.body.password, result[0]['password'], (bErr, bResult) => {
                    if (bErr) {
                        throw bErr;
                        return res.status(400).send({
                            message: "Username or password incorrect!"
                        });
                    }
                    if (bResult) { // password match
                        const token = jwt.sign()({
                                username: result[0].username,
                                userId: result[0].id,
                            }, 'SECRETKET',
                            {expiresIn: "7d"}
                        );
                        db.query(
                            `UPDATE users
                             SET last_login = now()
                             WHERE id = ${result[0].id}`
                        );
                        return res.status(200).send({
                            message: 'Logged in!',
                            token,
                            user: result[0]
                        })
                    }

                    return res.status(400).send({
                        message: "Username or password incorrect!",
                    })
                }
            );
        }
    );
    res.render('index');
});
// http://localhost:3000/api/secret-route
router.get('/gologin', (req, res, next) => {
    res.render('login');
});
// http://localhost:3000/api/secret-route
router.get('/secret-route', (req, res, next) => {
    res.send('This is secret content!');
});

module.exports = router;
