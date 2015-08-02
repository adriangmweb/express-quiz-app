var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quizz' });
});

router.param('quizId', quizController.load);

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.post('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/author', function(req, res) {
  res.render('author');
});

module.exports = router;
