const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  const authHeader = req.headers["authorization"];

  // VERIFICAR SI EXISTE HEADER
  if (!authHeader) {
    return res.status(401).json({
      message: "No token"
    });
  }

  // EXTRAER TOKEN
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token inválido"
    });
  }

  // VERIFICAR JWT
  jwt.verify(token, "SECRET_KEY", (err, decoded) => {

    if (err) {
      return res.status(403).json({
        message: "Token inválido"
      });
    }

    req.user = decoded;

    next();
  });
};

module.exports = verifyToken;