// Referencia a Módulos Externos
const mongoose = require("mongoose");

// Referencia Enrutador
const router = require("express").Router();

// Módulos locales
const utiles = require("../lib/utiles_jwt");

// Modelos
const Libro = require("../models/model_libros");

// API: /libros > WEB: Listado libros (TODOS)
// router.get("/libros", (req, res) => {
router.get("/libros", utiles.protegerRuta(""), (req, res) => {
  Libro.find()
    .then((resultado) => {
      if (resultado) {
        // WEB: Listado Libros - Todo: HTML > JSON
        res.render("libros_listado", {
          libros: resultado,
        });
      } else {
        // WEB: No hay libros para listar - Todo: HTML > JSON
        res.render("libros_error", {
          msg: "ERROR: No hay libros disponibles",
        });
      }
    })
    .catch((error) => {
      // WEB: Error del Servidor - Todo: HTML > JSON
      res.render("libros_error", {
        msg: "ERROR: Operación disponible próximamente",
      });
    });
});

// API: /libros/:id > WEB: Ficha libro (Id)
// router.get("/libros/:id", (req, res) => {
router.get("/libros/:id", utiles.protegerRuta(""), (req, res) => {
  Libro.findById(req.params.id)
    .then((resultado) => {
      if (resultado) {
        // WEB - Ficha Libro - Todo: HTML > JSON
        res.render("libros_ficha", {
          libro: resultado,
        });
      } else {
        // WEB - Libro No existe - Todo: HTML > JSON
        res.render("libros_error", {
          msg: "ERROR: Libro no disponible",
        });
      }
    })
    .catch((error) => {
      // WEB - Error del Servidor - Todo: HTML > JSON
      res.render("libros_error", {
        msg: "ERROR: Operación disponible proximamente",
      });
    });
});

// API: /libros > Inserta libro + WEB: Listado Libros
router.post("/libros", (req, res) => {
// router.post("/libros", utiles.protegerRuta("admin"), (req, res) => {
  // Inserción libro
  const libro = new Libro({
    // Controles Formulario > req.body
    titulo: req.body.titulo,
    editorial: req.body.editorial,
    precio: req.body.precio,
    autor: req.body.autor,
    comentarios: req.body.comentarios,
  });

  // libro > BD;
  libro
    .save()
    .then((resultado) => {
      if (resultado) {
        // WEB: Listado Libros - Todo: HTML > JSON
        res.redirect("/libros");
      } else {
        // WEB: Inserción cancelada - Todo: HTML > JSON
        res.render("libros_error", {
          msg: "ERROR: Inserción de libro cancelada",
        });
      }
    })
    .catch((error) => {
        // WEB: Error del Servidor - Todo: HTML > JSON
        res.render("libros_error", {
        msg: "ERROR: Operación disponible proximamente",
      });
    });
});

// API: /libros/:id > Actualiza libro (id) + WEB: Listado Libros
// router.put("/libros/:id", (req, res) => {
router.put("/libros/:id", utiles.protegerRuta("admin"), (req, res) => {
  mongoose.set("useFindAndModify", true); // Deprecation findByIdAndUpdate
  Libro.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        // Controles Formulario > req.body
        titulo: req.body.titulo,
        editorial: req.body.editorial,
        precio: req.body.precio,
        autor: req.body.autor,
        comentarios: req.body.comentarios,
      },
    },
    {
      new: true,
    }
  )
    .then((resultado) => {
      if (resultado) {
        // WEB: Listado Libros - Todo: HTML > JSON
        res.redirect("/libros");
      } else {
        // WEB: Modificación cancelada - Todo: HTML > JSON
        res.render("libros_error", {
          msg: "ERROR: Modificación del Libro cancelada",
        });
      }
    })
    .catch((error) => {
      // WEB: Error del Servidor - Todo: HTML > JSON
      res.render("libros_error", {
        msg: "ERROR: Operación disponible proximamente",
      });
    });
  mongoose.set("useFindAndModify", false); // Deprecation findByIdAndUpdate
});

// API: /libros/:id - Borra libro (id) + WEB: Listado Libros
// router.delete("/libros/:id", (req, res) => {
router.delete("/libros/:id", utiles.protegerRuta("admin"), (req, res) => {
  mongoose.set("useFindAndModify", true); // Deprecation findByIdAndUpdate
  Libro.findByIdAndRemove(req.params.id)
    .then((resultado) => {
      if (resultado) {
        // WEB: Listado Libros - Todo: HTML > JSON
        res.redirect("/libros");
      } else {
        // WEB: Borrado cancelado - Todo: HTML > JSON
        res.render("libros_error", {
          msg: "ERROR: Libro no disponible",
        });
      }
    })
    .catch((error) => {
      // WEB: Error del Servidor - Todo: HTML > JSON
      res.render("libros_error", {
        msg: "ERROR: Operación disponible proximamente",
      });
    });
  mongoose.set("useFindAndModify", false); // Deprecation findByIdAndUpdate
});

// Exporta Recursos
module.exports = router;
