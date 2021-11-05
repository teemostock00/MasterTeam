const express = require('express');
const router = express.Router();
const {response} = require("express");
router.use(express.static('public'));
const db = require('./connection');
const {route} = require("express/lib/router");

router.get('/', function(req, res, next) {
    res.redirect('/drink/page=1');
});

router.get('/page=:page', function(req, res, next){ // board/list/page숫자 형식으로 받을거
    var page = req.params.page; // :page 로 맵핑할 req 값을 가져온다
    var sql = "select * from liquors";
    db.query(sql, function(err, liquors){  // select 쿼리문 날린 데이터를 rows 변수에 담는다 오류가 있으면 err
        if(err) console.error("err : " + err);
        res.render('drink-page', {liquors : liquors,
            page:page, length:liquors.length-1, page_num:4, pass:true});
        // length 데이터 전체넘버 랜더링,-1을 한이유는 db에서는1부터지만 for문에서는 0부터 시작 ,page_num: 한페이지에 보여줄 갯수
    });
});

module.exports = router;
