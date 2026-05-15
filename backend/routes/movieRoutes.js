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

router.get("/", verifyToken, verifyRole("user"), getMovies);

router.post("/", verifyToken, verifyRole("admin"), createMovie);

router.put("/:id", verifyToken, verifyRole("admin"), updateMovie);

router.delete("/:id", verifyToken, verifyRole("admin"), deleteMovie);

module.exports = router;