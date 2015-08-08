//Definir modelo Comment con su validación

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Comment',
    {
      texto: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "No se ha añadido el comentario"}}
      },
      publicado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false 
      }
    }
  );
};
