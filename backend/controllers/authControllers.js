const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/db");

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM usuarios WHERE LOWER (nombre) = LOWER (?)",
    [username],
    async (err, results) => {
      if (err) return res.status(500).send(err);

      if (results.length === 0) {
        return res.status(401).json({ message: "Usuario no existe" });
      }

      const user = results[0];

      //  VALIDACIÓN DE PASSWORD
      //const validPassword = await bcrypt.compare(
       // password,
       // user.password);

       const validPassword = password === user.password;

      if (!validPassword) {
        return res.status(401).json({ message: "Password incorrecto" });
      }

      // 👇 CREAR TOKEN
      const token = jwt.sign(
        { id: user.id, rol: user.rol },
        "SECRET_KEY",
        { expiresIn: "1h" }
      );

      return res.json({
        message: "Login correcto",
        token,
        user: {
          id: user.id,
          nombre: user.nombre,
          rol: user.rol
        }
      });
    }
  );
};