var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quizz' });
});
router.get('/quizes/question', quizController.question);
router.post('/quizes/answer', quizController.answer);

module.exports = router;
