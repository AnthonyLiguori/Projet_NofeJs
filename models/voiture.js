const mongoose = require("mongoose");

const voitureSchema = mongoose.Schema({
  modele: String,
  marqueId: { type: mongoose.Schema.Types.ObjectId, ref: "Marque" },
  annee: Number,
  puissance: Number,
  km: Number,
  moteur: String,
  prix: Number,
  photo: String,
  estFavoris: { type: Boolean, required: false, default: false },
});

module.exports = mongoose.model("Voiture", voitureSchema);
