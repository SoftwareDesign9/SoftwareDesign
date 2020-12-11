var express = require('express');
var router = express.Router();

var requestTime = function (req, res, next) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write("test\n");
  next();
};

router.use(requestTime);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.write('respond with a resource');
  res.end();
});

module.exports = router;
