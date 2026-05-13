const express = require('express');
const router = express.Router();
const db = require('../db');

// GET
router.get("/", (req, res) => {
  db.query("SELECT * FROM peliculas", (err, resultados) => {
    if (err) return res.status(500).send(err);
    res.json(resultados);
  });
});

// POST
router.post("/", (req, res) => {
  const { titulo, director, anio, genero } = req.body;

  if (!titulo || !director || !anio || !genero) {
    return res.status(400).json({ message: "Faltan datos" });
  }

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
router.put("/:id", (req, res) => {
  const { titulo, director, anio, genero } = req.body;

  if (!titulo || !director || !anio || !genero) {
    return res.status(400).json({ message: "Faltan datos" });
  }

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
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM peliculas WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Película eliminada" });
    }
  );
});

module.exports = router;