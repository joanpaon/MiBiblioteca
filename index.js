// Módulos Externos
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const methodOverride = require("method-override");
const nunjucks = require("nunjucks");

// Conecta BD
require("./databases/db_libros").conectar();

// Inicializa Express
let app = express();

// Middleware - Logger
app.use(logger("dev"));

// Inicializa Motor plantillas
app.set("view engine", "njk");
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// PUT + DELETE > Formularios HTML
app.use(methodOverride("_method"));

// Datos Petición (JSON|URLENcoded) > Body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Archivos Estáticos
app.use("/static", express.static("./public"));

// Enrutadores
app.use("/", require("./routes/web_routes"));
app.use("/", require("./routes/api_routes"));

// Middleware - Recurso no Disponible
// app.use((req, res) => {
//   res.redirect("/static/server404.html");
// });

// Activa express
app.listen(process.env.PORT || 8080, () => {
  console.log(`Servidor en puerto ${process.env.PORT || 8080}`);
});
