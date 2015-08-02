var models = require('../models/models.js');
//Get /quizes/question
exports.question = function(req, res){
  models.Quiz.findAll().then(function(quiz) {
    console.log(quiz);
    res.render('quizes/question', {pregunta: quiz[0].pregunta, pista: quiz[0].pista});
  });
};

//GET /quizes/answer
exports.answer = function(req, res){
  models.Quiz.findAll().success(function(quiz) {
    if (req.body.respuesta === quiz[0].respuesta){
      res.render('quizes/answer', {respuesta: 'Correcta'});
    }else{
      res.render('quizes/answer', {respuesta: 'Incorrecta'});
    }
  });
};
