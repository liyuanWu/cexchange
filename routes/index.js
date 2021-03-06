var express = require('express');
var router = express.Router();
var redis = require('../modules/database')

/* GET users listing. */
router.get('/', function(req, res, next) {
  redis.hgetall('names', function (err, replies) {
    if(!replies){
      replies={};
    }
    res.render('index', { title: 'All Items', items: replies });
  });
});

module.exports = router;
