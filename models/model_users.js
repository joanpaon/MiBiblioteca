// Referencia a Moongose
const mongoose = require("mongoose");

// Definición Usuario > Esquema
let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    match: /^\w.*$/,
  },
  pass: {
    type: String,
    required: true,
    trim: true,
    match: /^\w.*$/,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    match: /^\w.*$/,
  },
});

// Compila: Nombre de Colección + Esquema > Modelo
let User = mongoose.model("users", userSchema);

// Exportar Modelo
module.exports = User;
