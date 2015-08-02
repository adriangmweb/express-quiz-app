var path = require('path');

//Postgres DATABASE_URL = postgres://user:passwd@host:port/database
//SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pass_db = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Cargar ORM
var Sequelize = require("sequelize");

//Usar DB SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pass_db, {
                      dialect: protocol,
                      protocol: protocol,
                      port: port,
                      host: host,
                      storage: storage, //only sqlite
                      omitNull: true //only postgres
                    }
                    );
//Importar referencia a la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; //Exportar la referencia a la tabla

//Sincronizamos y creamos la tabla "preguntas"
sequelize.sync().then(function() {
  //then se ejecuta una vez se cree la tabla
  Quiz.count().then(function (count) {
    if (count === 0){ //Si está vacía se inicializa la tabla
      Quiz.create({
        pregunta: '¿Cuál es la capital de Italia?',
        respuesta: 'Roma',
        pista: "Sus soldados luchaban contra Asterix y Obelix."
      });
      Quiz.create({
        pregunta: "¿Cuál es la capital de Portugal?",
        respuesta: "Lisboa",
        pista: "Incluye el nombre de una serpiente."
      })
      .then(function(){console.log('La base de datos se ha inicializado')});
    };
  });
});
