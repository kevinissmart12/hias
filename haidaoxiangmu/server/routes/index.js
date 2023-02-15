var express = require('express');
var router = express.Router();
var db=require('../db/index')

/* GET home page. */
router.get('/test', function(req, res, next) {
    res.send('ok11')
});

module.exports = router;
