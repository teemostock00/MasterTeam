
const express = require('express');
const router = express.Router();
const {response} = require("express");
router.use(express.static('public'));
const db = require('./connection');
const {route} = require("express/lib/router");
const {RowDataPacket} = require("mysql/lib/protocol/packets");
router.use(express.json());

router.get('/', function(req, res, next) {
    res.render('map.ejs')
});

router.post("/food",(req,res)=>{
    console.log(req.body.food)
    const foodName = "%"+req.body.food+"%"
    // res.json(req.body.food)
    const sqlSelect = "SELECT * FROM foods f, restaurants r where food_name LIKE ? and f.food_seq = r.food_seq";
    db.query(sqlSelect,foodName,(err,foods)=>{
        console.log(foods)
        res.json(foods)

        // var json = foods;
        // Object.keys(json).forEach(function(k){
        //     console.log('키값 : '+k + ', 데이터값 : ' + json[k]);
        // });
    });
});

module.exports = router;
