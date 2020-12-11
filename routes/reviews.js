var express = require('express');
var router = express.Router();

/* GET reviews listing. */
router.get('/', function(req, res, next) {
  res.render('/reviews/list');
});


router.get('/write', function(req, res, next) {
  res.render('/reviews/write');
});

router.get('/update', function(req, res, next) {
  res.render('/reviews/update');
});

router.post('/write', function(req, res, next) {
  var title = res.title;
  //post로 받아온 각 데이터를 변수에 저장하여 db에 반영

  
  res.redirect('/');
})

module.exports = router;
