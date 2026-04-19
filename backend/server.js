const express = require ('express');
const cors = require ('cors');
const db = require('./db');


const app = express();
app.use(cors());
app.use(express.json());

//Ruta de prueba
app.get('/peliculas',(req, res) => {
    db.query('SELECT * FROM peliculas',(err, resultados) => { 
    if (err) {
        res.status(500).send(err);
    } else {
        res.json(resultados);
    }
  });
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:300')
});

