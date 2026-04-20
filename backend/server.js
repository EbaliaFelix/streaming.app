const express = require('express');
const cors = require('cors');
const path = require("path");
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

/* FRONTEND */
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});


/* =======================
   API MYSQL - CRUD
======================= */

// GET
app.get("/peliculas", (req, res) => {
  db.query("SELECT * FROM peliculas", (err, resultados) => {
    if (err) return res.status(500).send(err);
    res.json(resultados);
  });
});


// POST
app.post("/peliculas", (req, res) => {
  const { titulo, director, anio, genero } = req.body;

  db.query(
    "INSERT INTO peliculas (titulo, director, anio, genero) VALUES (?, ?, ?, ?)",
    [titulo, director, anio, genero],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Película agregada" });
    }
  );
});


// PUT
app.put("/peliculas/:id", (req, res) => {
  const { titulo, director, anio, genero } = req.body;

  db.query(
    "UPDATE peliculas SET titulo=?, director=?, anio=?, genero=? WHERE id=?",
    [titulo, director, anio, genero, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Película actualizada" });
    }
  );
});


// DELETE
app.delete("/peliculas/:id", (req, res) => {
  db.query(
    "DELETE FROM peliculas WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Película eliminada" });
    }
  );
});


/* SERVIDOR */
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});