const jwt = require('jsonwebtoken');

module.exports = {
    validateRegister: (req, res, next) => {
        // username min length 3
        // username 최소 3글자 이상 입력 안하면 400 반환하고 message 띄움
        if(!req.body.username || req.body.username.length < 3){
            return res.status(400).send({
                message: "Please enter a username with min. 3 chars",

            });
        };
        // password min 6 chars
        // password 최소 6글자 이상 입력 안하면 400 반환하고 message 띄움
        if(!req.body.password || req.body.password.length < 6){
            return res.status(400).send({
                message: "Please enter a username with min. 6 chars",

            });
        };
        // password (repeat) mush match
        // password != password_repeat 이면 400 반환하고 에러메세지 띄움
        if(
            !req.body.password_repeat ||
            req.body.password != req.body.password_repeat
        ) {
            return res.status(400).send({
                message: "Both passwords mush match",
            });
        }
        next();
    },
    isLoggedin: () => {

    },
};
