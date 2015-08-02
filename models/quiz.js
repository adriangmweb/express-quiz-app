//Definimos el modelo quiz
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quiz', {
    pregunta: DataTypes.STRING,
    respuesta: DataTypes.STRING,
    pista: DataTypes.STRING
  });
}
