var models = require('../models/models.js');

//Autoload para gestionar errores
exports.load = function(req, res, next, quizId) {
  models.Quiz.findById(req.params.quizId).then(function (quiz){
    if (quiz){
      req.quiz = quiz;
      next();
    }else{
      next(new Error('No existe la pregunta: ' + quizId));
    }
  }
).catch(function(error){ next(error)});
}

exports.index = function (req, res) {
  if (req.query.search){
    models.Quiz.findAll({ where: ["pregunta like ?", "%"+ req.query.search +"%"] }).then(function(quizes) {
      res.render('quizes/index', {quizes: quizes});
    });
  }else{
    models.Quiz.findAll().then(function(quizes) {
      res.render('quizes/index', { quizes : quizes});
    }
  ).catch(function (error) { next(error)  });
}
}

//Get /quizes/question
exports.show = function(req, res){
  models.Quiz.findById(req.params.quizId).then(function(quiz) {
    res.render('quizes/show', {quiz: req.quiz, pista: req.quiz.pista});
  });
};

//GET /quizes/answer
exports.answer = function(req, res){
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    if (req.body.respuesta === quiz.respuesta){
      res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcta'});
    }else{
      res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecta'});
    }
  });
};
