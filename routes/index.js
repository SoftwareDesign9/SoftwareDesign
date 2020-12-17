var express = require('express');
var router = express.Router();
var db = require('mysql');
var session = require('express-session');
var mysqlStore = require('express-mysql-session')(session);
var option = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'swDesign'
};
var connection = db.createConnection(option);
var sessionStore = new mysqlStore(option);

router.use(session({
  key: 'session',
  secret: '123y92&H&*dw',
  store: sessionStore,
  resave: false,
  saveUninitialized: true
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("show index");
  res.render('setUniv');
  console.log('complete');
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
  var arr = [id, password];
  var sql = 'SELECT * FROM user WHERE u_id=? AND u_passwd=?';
  console.log(sql);
  var query=connection.query(sql, arr, function(err, data) {
    console.log(data);
    if(data.length != 0) {
      console.log('success');
      req.session.isLogined = true;
      req.session.save();
      res.redirect('/');
    }
    else
    {
      console.log('failed');
      req.session.isLogined = false;
      req.session.save();
      res.redirect('/login');
    }
  })
});

router.get('/signup', function(req, res, next) {
  res.render('signUp');
})

router.post('/signup', function(req, res, next) {
  var pName = req.body.name;
  var pId = req.body.id;
  var pPw = req.body.pw1;
  var pHp = req.body.hp1+req.body.hp2+req.body.hp3;
  var pEmail = req.body.email;  
  var arr = [pName, pId, pPw, pHp, pEmail];
  console.log(arr);

  var sql = 'INSERT INTO user(u_id, u_name, u_passwd, u_phonenum, u_email) VALUES(?,?,?,?,?)';

  var query = connection.query(sql, arr, function(err, data) {
    if(err)
      console.log(err);
    console.log(data);
    res.redirect('/reviews');
  });
  console.log(query);
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
  res.render('index');
});

module.exports = router;
