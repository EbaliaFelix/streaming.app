const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const verifyRole = require("../middleware/roleMiddleware");

const {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie
} = require("../controllers/movieControllers");

// GET
router.get("/", verifyToken, verifyRole("user"), getMovies);

// POST
router.post("/", verifyToken, verifyRole("admin"), createMovie);

// PUT
router.put("/:id", verifyToken, verifyRole("admin"), updateMovie);

// DELETE
router.delete("/:id", verifyToken, verifyRole("admin"), deleteMovie);

module.exports = router;