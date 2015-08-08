var users = {
  admin: {id: 1, username: "admin", passwd: "1234"},
  pepe: {id: 2, username: "pepe", passwd: "5678"}
};

//Comprobamos si el usuario existe, si no se ejecuta el callback error
exports.autenticar = function(login, passwd, callback){
  if(users[login]){
    if(passwd === users[login].passwd){
      callback(null, users[login]);
    }else{
      callback(new Error("No existe un usuario con ese ID y esa contraseña"));
    }
  }else{
    callback(new Error("El usuario no existe "));
  }
};
