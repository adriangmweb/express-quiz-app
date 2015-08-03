//Definimos el modelo quiz
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quiz', {
    pregunta: {
      type: DataTypes.STRING,
      validate: { notEmpty: {msg: "Debes añadir una pregunta"} }
    },
    respuesta: {
      type: DataTypes.STRING,
      validate: { notEmpty: {msg: "Es necesario añadir la respuesta"} }
    },
    pista: {
      type: DataTypes.STRING,
      validate: { notEmpty: {msg: "Añade una pequeña pista"} }
    },
    tema: {
      type: DataTypes.STRING,
      validate: { notEmpty: {msg: "Añade el tipo de pregunta"} }
    }
  });
}
