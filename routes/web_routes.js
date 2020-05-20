// Referencia Enrutador
const router = require("express").Router();

// Módulos locales
const utiles = require("../lib/utiles_jwt");

// Base de datos simulada de USUARIOS registrados
const USUARIOS = require("../data/data_users.json");

// Modelos
const Libro = require("../models/model_libros");
// const User = require("../models/model_users");

// WEB: / - Página de Inicio - NO Sesión
router.get("/", (req, res) => {
  res.render("libros_inicio", {
    msg: "Página de Inicio",
  });
});

// WEB: /signin - Formulario Identificación
router.get("/signin", (req, res) => {
  res.render("libros_signin");
});

// API|WEB: /signin - Recibir + Procesar Credencial - Enviar Token
router.post("/signin", (req, res) => {
  // Obtiene Credencial del Cuerpo
  let name = req.body.name;
  let pass = req.body.pass;

  // Filtra Usuarios[Credencial]
  let usuariosValidos = USUARIOS.filter(
    (u) => u.name == name && u.pass == pass
  );

  // Uno y sólo un usuario válido
  if (usuariosValidos.length == 1) {
    // name + pass > token
    let token = utiles.generarToken(
      usuariosValidos[0].name,
      usuariosValidos[0].role
    );

    // WEB: Principal - Credencial OK - Todo: HTML > JSON (API)
    res.render("libros_principal", {
      user: name,
      token,
    });
  } else {
    // WEB: Error - Credencial NO - Todo: HTML > JSON (API)
    res.render("libros_error", {
      msg: "ERROR: Credencial Incorrecta",
    });
  }
});

// WEB: /web/libros/principal - Página Principal - User
// router.get("/web/libros/principal", (req, res) => {
router.get("/web/libros/principal", utiles.protegerRuta(""), (req, res) => {
  res.render("libros_principal");
});

// WEB: /web/libros/nuevo - Formulario Inserción Nuevo Libro - Admin
// router.get("/web/libros/nuevo", (req, res) => {
router.get("/web/libros/nuevo", utiles.protegerRuta("admin"), (req, res) => {
  res.render("libros_nuevo");
});

// WEB: /web/libros/nuevo/proxy - Datos > API Nuevo Libro - Nadie
router.post("/web/libros/nuevo/proxy", (req, res) => {
  res.render("libros_nuevo_proxy", {
    titulo: req.body.titulo,
    editorial: req.body.editorial,
    precio: req.body.precio,
  });
});

// WEB: /web/libros/edicion/proxy - Datos > API Libro Modificado - Nadie
router.post("/web/libros/edicion/proxy", (req, res) => {
  res.render("libros_edicion_proxy", {
    id: req.body.id,
    titulo: req.body.titulo,
    editorial: req.body.editorial,
    precio: req.body.precio,
  });
});

// WEB: /libros/edicion/:id - Formulario Modificación libro (Id) - Admin
// router.get("/libros/edicion/:id", (req, res) => {
router.get(
  "/web/libros/edicion/:id",
  utiles.protegerRuta("admin"),
  (req, res) => {
    Libro.findById(req.params.id) // (Servidor Cliente) >> (Servidor APP) ???
      .then((resultado) => {
        if (resultado) {
          // WEB - Edición Libro
          res.render("libros_edicion", {
            libro: resultado,
          });
        } else {
          // WEB - No existe libro
          res.render("libros_error", {
            msg: "ERROR: Libro no disponible",
          });
        }
      })
      .catch((error) => {
        // WEB - Error del Servidor
        res.render("libros_error", {
          msg: "ERROR: Operación disponible proximamente",
        });
      });
  }
);

// WEB: /libros/borrado/:id - Formulario Borrado libro (Id) - Admin
// router.get("/libros/borrado/:id", (req, res) => {
router.get(
  "/web/libros/borrado/:id",
  utiles.protegerRuta("admin"),
  (req, res) => {
    Libro.findById(req.params.id) // (Servidor Cliente) >> (Servidor APP) ???
      .then((resultado) => {
        if (resultado) {
          // WEB - Edición Libro
          res.render("libros_borrado", {
            libro: resultado,
          });
        } else {
          // WEB - No existe libro
          res.render("libros_error", {
            msg: "ERROR: Libro no disponible",
          });
        }
      })
      .catch((error) => {
        // WEB - Error del Servidor
        res.render("libros_error", {
          msg: "ERROR: Operación disponible proximamente",
        });
      });
  }
);

// Exporta Recursos
module.exports = router;
