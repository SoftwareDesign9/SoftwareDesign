var express = require('express');
var router = express.Router();

/* GET reviews listing. */
router.get('/', function(req, res, next) {
  var sql = 'SELECT title, article, likes review FROM review';
  var query = db.query(sql, function(err, data) {
    if(err)
      console.log(err);
    console.log(data);
    res.render('/reviews/list', {datas: data});
  })
  
});

router.get('/write', function(req, res, next) {
  res.render('/reviews/write');
});

//post로 받아온 각 데이터를 변수에 저장하여 db에 반영
router.post('/write', function(req, res, next) {
  var body = req.body;
  //query
  var sql = 'INSERT INTO review (name, id, pw, nickname, email) VALUES (?, ?, ?, ?, ?)';
  var query = db.query(sql, [body.name, body.id, body.pw, body.nickname, body.email], function () {
    console.log(query);
    res.redirect('/');
  })
});

router.get('/update', function(req, res, next) {
  res.render('/reviews/update');
});


module.exports = router;
