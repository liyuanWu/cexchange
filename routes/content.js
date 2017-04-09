var express = require('express');
var router = express.Router();
var redis = require('../modules/database');

/* GET users listing. */
router.get('/:name', function(req, res, next) {
  redis.hget('category', req.params.name, function (err, reply) {
    if(!reply){
      console.error("Content Empty: " + req.params.name);
      res.render('content', { title: "Content Empty: " + req.params.name});
    }
    var rep = JSON.parse(reply);

    res.render('content', { title: req.params.name, metas: rep.metas, content: rep.content });
  });
});

module.exports = router;
