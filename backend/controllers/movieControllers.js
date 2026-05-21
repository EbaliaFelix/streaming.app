const db = require("../config/db");

/* GET - todas las películas */
exports.getMovie = (req, res) => {
  db.query("SELECT * FROM peliculas", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

/* POST - crear película */
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

/* PUT - actualizar película */
exports.updateMovie = (req, res) => {
  const { id } = req.params;
  const { titulo, director, anio, genero } = req.body;

  db.query(
    "UPDATE peliculas SET titulo=?, director=?, anio=?, genero=? WHERE id=?",
    [titulo, director, anio, genero, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Película actualizada" });
    }
  );
};

/* DELETE - eliminar película */
exports.deleteMovie = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM peliculas WHERE id=?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Película eliminada" });
  });
};