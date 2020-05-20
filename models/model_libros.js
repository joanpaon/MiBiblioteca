// Referencia a Moongose
const mongoose = require("mongoose");

// Definición Comentario > Exquema
let comentarioSchema = new mongoose.Schema({
  nick: {
    type: String,
    required: true,
    trim: true,
    match: /^\w.*$/,
  },
  comentario: {
    type: String,
    required: true,
    trim: true,
    match: /^\w.*$/,
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Definición Libro > Exquema
let libroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
    match: /^\w.*$/,
  },
  editorial: {
    type: String,
    required: true,
    trim: true,
    match: /^\w.*$/,
  },
  precio: {
    type: Number,
    min: 0,
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId, // 1:1 Clave Ajena: Id de Autor
    ref: "autor",
  },
  comentarios: [comentarioSchema],
});

// Compila: Nombre de Colección + Esquema > Modelo
let Libro = mongoose.model("libros", libroSchema);

// Exportar Modelo
module.exports = Libro;
