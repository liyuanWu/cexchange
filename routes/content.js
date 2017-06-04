var express = require('express');
var router = express.Router();
var redis = require('../modules/database');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  redis.hget('goods', req.params.id, function (err, reply) {
    if(!reply){
      console.error("Content Empty: " + req.params.id);
      res.render('content', { title: "Content Empty: " + req.params.id});
    }
    var rep = JSON.parse(reply);
    res.render('content',
      {
        title: rep.name,
        image: rep.image,
        metas: rep.metas,
        content: rep.content
      });
  });
});

router.post('/:id', function (req, res) {
  redis.hget('goods', req.params.id, function (err, reply) {
    if(!reply){
      console.error("Content Empty: " + req.params.id);
      res.render('content', { title: "Content Empty: " + req.params.id});
    }
    var rep = JSON.parse(reply);
    var newMetas = {};
    req.body.metas.split("\r\n").forEach(function(m){
      if(m){
        var meta = m.split(":");
        newMetas[meta[0]] = meta[1];
      }
    });

    redis.hset('goods', req.params.id, JSON.stringify({
      name: req.body.title,
      image: rep.image,
      metas: newMetas,
      content: req.body.content
    }));

    redis.hset('names', req.params.id, req.body.title);

    res.render('content',
      {
        title: req.body.title,
        image: rep.image,
        metas: newMetas,
        content: req.body.content
      });
  });
});

module.exports = router;
