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

/* RUTAS */
const peliculasRoutes = require('./routes/crud');
const authRoutes = require('./routes/auth');

app.use('/peliculas', peliculasRoutes);
app.use('/auth', authRoutes);


/* SERVIDOR */
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});