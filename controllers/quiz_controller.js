//Get /quizes/question
exports.question = function(req, res){
  res.render('quizes/question', {pregunta: '¿Cuál es la capital de Italia?', pista: 'No olvides usar mayúsculas.'});
};

//GET /quizes/answer
exports.answer = function(req, res){
  console.log(req.query.respuesta);
  if (req.body.respuesta === 'Roma'){
    res.render('quizes/answer', {respuesta: 'Correcta'});
  }else{
    res.render('quizes/answer', {respuesta: 'Incorrecta'});
  }
};
