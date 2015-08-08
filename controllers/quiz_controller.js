var models = require('../models/models.js');

//Autoload para gestionar errores
exports.load = function(req, res, next, quizId) {
  models.Quiz.find({
    where: { id: Number(req.params.quizId)},
    include: {model: models.Comment}
  }).then(function (quiz){
    if (quiz){
      req.quiz = quiz;
      next();
    }else{
      next(new Error('No existe la pregunta: ' + quizId));
    }
  }
).catch(function(error){ next(error)});
}

exports.index = function (req, res, next) {
  if (req.query.search){
    models.Quiz.findAll({ where: ["pregunta like ?", "%"+ req.query.search +"%"] }).then(function(quizes) {
      res.render('quizes/index', {quizes: quizes, errors: []});
    });
  }else{
    models.Quiz.findAll().then(function(quizes) {
      res.render('quizes/index', { quizes : quizes, errors: []});
    }
  ).catch(function (error) { next(error)  });
}
}

//Get /quizes/question
exports.show = function(req, res){
  models.Quiz.findById(req.params.quizId).then(function(quiz) {
    res.render('quizes/show', {quiz: req.quiz, pista: req.quiz.pista, errors: []});
  });
};

//GET /quizes/answer
exports.answer = function(req, res){
  models.Quiz.findById(req.params.quizId).then(function(quiz) {
    if (req.body.respuesta === quiz.respuesta){
      res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcta', errors: []});
    }else{
      res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecta', errors: []});
    }
  });
};

//GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(
    { pregunta: "Pregunta", respuesta: "Respuesta", pista: "Pista"}
  );
  res.render('quizes/new', { quiz: quiz, errors: []});
};

//GET /quizes/edit
exports.edit = function(req, res){
  var quiz = req.quiz; //se instancia en el Autoload
  res.render('quizes/edit', {quiz: quiz, errors: []});
};

//PUT update
exports.update = function(req, res){
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.pista = req.body.quiz.pista;
  req.quiz.tema = req.body.quiz.tema;
console.log(req.body.quiz.tema);
  req.quiz
  .validate()
  .then(
    function(err){
      if(err){
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      }else{
        req.quiz
        .save( { fields: ['pregunta', 'respuesta', 'pista', 'tema'] } )
        .then( function() { res.redirect('/quizes')});
      }
    }
  );
};

//POST quizes/create
exports.create = function(req, res){
  var quiz = models.Quiz.build( req.body.quiz );
  //guadar pregunta, respuesta y pista en la bd
  quiz
  .validate()
  .then(
    function(err) {
      if (err){
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      }else{
        quiz
        .save( {fields: ["pregunta", "respuesta", "pista", "tema"]} ).then(function() {
          res.redirect('/quizes');
        });
      }
    }
  );
};

//DELETE
exports.destroy = function(req, res){
  console.log('ey');
  req.quiz.destroy().then( function() {
    res.redirect('/quizes');
  }).catch(function(error) {next(error)});
};
