const db = require("../db");

exports.getMovies = (req, res) => {
  db.query("SELECT * FROM peliculas", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.createMovie = (req, res) => {
  const { titulo, director, anio, genero } = req.body;

  db.query(
    "INSERT INTO peliculas (titulo, director, anio, genero) VALUES (?, ?, ?, ?)",
    [titulo, director, anio, genero],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Película creada" });
    }
  );
};