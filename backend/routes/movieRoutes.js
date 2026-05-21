const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const verifyRole = require("../middleware/roleMiddleware");

const {
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie
} = require("../controllers/movieControllers");

// VER PELÍCULAS
router.get(
  "/",
  verifyToken,
  verifyRole("admin", "editor", "user"),
  getMovie
);


// CREAR
router.post(
  "/",
  verifyToken,
  verifyRole("admin", "editor"),
  createMovie
);


// ACTUALIZAR
router.put(
  "/:id",
  verifyToken,
  verifyRole("admin", "editor"),
  updateMovie
);


// ELIMINAR
router.delete(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  deleteMovie
);

module.exports = router;