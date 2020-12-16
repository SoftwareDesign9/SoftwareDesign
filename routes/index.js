var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* POST login page. */
router.post('/login_process', function(req, res, next) {
  var id = req.body.id;
  console.log(id);
  var password = req.body.pw;
  console.log(password);
  var sql = 'SELECT * FROM user WHERE id=?';
  console.log(sql);
  if(id == 'tester1' && password === 'passwd') {
    console.log('success');
    req.session.isLogined = true;
    req.session.save();
    res.redirect('/');
  }
  else
  {
    console.log(failed);
    req.session.isLogined = false;
    req.session.save();
    res.redirect('/login');
  }
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
  res.render('index');
});

module.exports = router;
