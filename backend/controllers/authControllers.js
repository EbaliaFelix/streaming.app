const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db");

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).send(err);

    if (results.length === 0) {
      return res.status(400).json({ message: "Usuario no existe" });
    }

    const user = results[0];

    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: "Password incorrecto" });
    }

    //TOKEN JWT
    const token = jwt.sign(
      { id: user.id, role: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        role: user.rol
      }
    });
  });
};