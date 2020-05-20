// Modulos Externos
const mongoose = require("mongoose");

// Configuración BD
const CONFIG_DB = require("../data/config_db.json") || {};

// Parámetros BD
const PROT = CONFIG_DB.protocol || "mongodb";
const HOST = CONFIG_DB.host || "localhost";
const PORT = CONFIG_DB.port || "27017";
const DBNM = CONFIG_DB.dbName || "libros";
const CURI = `${PROT}://${HOST}:${PORT}/${DBNM}`;

// Conectar BD - URI
const _conectarURI = (uri) => {
  mongoose
    .connect(CURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .catch((error) => {
      console.log("ERROR: BD no conectada");
      console.log(error);
    });
};

// Conectar BD - Predeterminado
const _conectar = () => {
  _conectarURI(CURI);
};

// Exportar Recursos
module.exports = {
  conectar: _conectar,
  conectarURI: _conectarURI,
};
