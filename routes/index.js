var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hebrew' });
});

/* GET home page. */
router.get('/alphabet', function(req, res, next) {
  res.render('alphabet', { title: 'Hebrew: Alphabet' });
});

router.get('/dictionary', function(req, res, next) {
  res.render('dictionary', { title: 'Hebrew: Dictionary' });
});

router.get('/lessons', function(req, res, next) {
  res.render('lessons', { title: 'Hebrew: Lessons' });
});
module.exports = router;
