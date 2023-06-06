const mongoose = require("mongoose");

const marqueSchema = mongoose.Schema({
  nom: String,
  logo: String,
});

module.exports = mongoose.model("Marque", marqueSchema);
