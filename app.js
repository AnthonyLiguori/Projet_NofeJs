const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const Marque = require("./models/marque");
const Voiture = require("./models/voiture");

mongoose
  .connect(
    "mongodb+srv://esn:castres81100@cluster0.7vtsq.mongodb.net/voitures7?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée :", error));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/api/voitures/favoris", (req, res, next) => {
  Voiture.find({ estFavoris: true })
    .then((voitures) => res.status(200).json(voitures))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/marques", (req, res, next) => {
  Marque.find()
    .then((marques) => res.status(200).json(marques))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/marques/:id", (req, res, next) => {
  Marque.findById(req.params.id)
    .then((marque) => res.status(200).json(marque))
    .catch((error) => res.status(404).json({ error }));
});

app.post("/api/marques", (req, res, next) => {
  const marque = new Marque({
    ...req.body,
  });
  marque
    .save()
    .then(() => res.status(201).json({ message: "Marque enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/marques/:id/voitures", (req, res, next) => {
  Voiture.find({ marqueId: req.params.id })
    .then((voitures) => res.status(200).json(voitures))
    .catch((error) => res.status(400).json({ error }));
});

app.post("/api/voitures", (req, res, next) => {
  const voiture = new Voiture({
    modele: req.body.modele,
    marqueId: req.body.marqueId,
    annee: req.body.annee,
    puissance: req.body.puissance,
    km: req.body.km,
    moteur: req.body.moteur,
    prix: req.body.prix,
    photo: req.body.photo,
    estFavoris: req.body.estFavoris,
  });
  voiture
    .save()
    .then(() => res.status(201).json({ message: "Voiture enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.put("/api/voitures/:voitureId/favoris", (req, res, next) => {
  const voitureId = req.params.voitureId;
  Voiture.findById(voitureId)
    .then((voiture) => {
      if (!voiture) {
        return res.status(404).json({ error: "Voiture non trouvée" });
      }
      voiture.estFavoris = !voiture.estFavoris;
      return voiture.save();
    })
    .then(() =>
      res.status(200).json({ message: "Favori succès !" })
    )
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
