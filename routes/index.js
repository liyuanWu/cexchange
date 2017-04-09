var express = require('express');
var router = express.Router();
var redis = require('../modules/database')

/* GET users listing. */
router.get('/', function(req, res, next) {
  redis.hkeys('category', function (err, replies) {
    res.render('index', { title: 'All Items', items: replies });
  });
});

module.exports = router;
