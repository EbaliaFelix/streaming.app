const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/peliculas", verifyToken, getMovies);

router.post(
  "/peliculas",
  verifyToken,
  verifyRole("admin"),
  createMovie
);