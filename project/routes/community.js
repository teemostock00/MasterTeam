const express = require('express');
const router = express.Router();
const db = require('./connection');

router.use(express.static('public'));

router.get('/', function(req, res, next) {
    res.render('community');
});

module.exports = router;
