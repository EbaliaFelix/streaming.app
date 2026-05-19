const express = require('express');
const cors = require('cors');
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* RUTAS */
const peliculasRoutes = require('./routes/movieRoutes');
const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);
app.use('/peliculas', peliculasRoutes,movieRoutes);

/* FRONTEND */
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

/* SERVIDOR */
require('dotenv').config();
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});