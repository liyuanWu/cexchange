var express = require('express');
var router = express.Router();
var redis = require('../modules/database')

/* GET users listing. */
router.post('/', function(req, res, next) {
  redis.newItem();
  redis.hgetall('names', function (err, replies) {
    res.render('index', { title: 'All Items', items: replies });
  });
});

module.exports = router;
