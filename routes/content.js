var express = require('express');
var router = express.Router();
var redis = require('../modules/database')

/* GET users listing. */
router.get('/:name', function(req, res, next) {
  redis.hget('hash key', req.params.name, function (err, replies) {
    if(!replies){
      console.error("Content Empty: " + req.params.name);
      res.render('content', { title: "Content Empty: " + req.params.name, content: replies });
    }
    res.render('content', { title: req.params.name, content: replies });
  });
});

module.exports = router;
