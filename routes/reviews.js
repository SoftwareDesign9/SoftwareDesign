var express = require('express');
var router = express.Router();
var db = require('mysql');
var session = require('express-session');
var mysqlStore = require('express-mysql-session')(session);
var option = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'swDesign',
  multipleStatements: true
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

/* GET reviews listing. */
router.post('/', function(req, res, next) {
  var college = req.body.c_name;
  console.log(college);
  var sql1 = "SELECT * FROM restaurant WHERE r_id IN (SELECT r_id FROM college_restaurant WHERE c_id=(SELECT c_id FROM college WHERE c_name=?));";
  //var sql2 = "SELECT * FROM review WHERE r_id=( SELECT r_id FROM restaurant WHERE r_id IN (SELECT r_id FROM college_restaurant WHERE c_id=(SELECT c_id FROM college WHERE c_name=?)) LIMIT 1 ) LIMIT 1;";
  //sqls += db.format(sql2, college);
  
  //res.render('index');
  var query1 = connection.query(sql1, college, function(err, data) {
    if(err)
      console.log('error occured'+err);
    console.log(data);
    //res.render('index', {data: data});
    res.render('index', {datas:data});
  })
  console.log(query);
});

/*router.post('/', function(req, res, next) {
  var query = connection.query(sql, college, function(err, data) {
    if(err)
      console.log(err);
    console.log(data);
    res.render('index')
  })
})*/

router.get('/detail/:r_id', function(req, res, next) {
  console.log('show info2');
  res.render('restaurantInfo2');
})

router.get('/write', function(req, res, next) {
  res.render('writeArticle');
});

//post로 받아온 각 데이터를 변수에 저장하여 db에 반영
router.post('/write', function(req, res, next) {
  var body = req.body;
  //query
  var sql = 'INSERT INTO review (u_id, r_id, title, article) VALUES (?, ?, ?, ?)';
  var query = connection.query(sql, [1, 1, body.title, body.article], function (err, data) {
    console.log(data);
    res.redirect('/reviews');
  })
  console.log(query);
});

router.get('/update', function(req, res, next) {
  res.render('/reviews/update');
});


module.exports = router;
