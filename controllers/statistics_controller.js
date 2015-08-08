var models = require('../models/models.js');

//GET /quizes/statistics
exports.index = function(req, res){
  models.Quiz.findAll().then(function(quizes){
    models.Comment.findAll().then(function(comments){
      res.render('statistics/index', {quizes: quizes, comments: comments, errors: {}});
    })

  });
};
