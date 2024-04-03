var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ARC Tutorials',subtitle:'Welcome to the best Youtube Audians' });
});

router.get('/tutorials', function(req, res, next) {
  const courseName=req.query.course;
  const courseTitle='ARC Tutorials  '+courseName
  res.render('index', { title:courseTitle , subtitle:'Welcome to the best Angular Developers ' +courseName});
});

module.exports = router;
