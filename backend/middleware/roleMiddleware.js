const verifyRole = (...roles) => {

  return (req, res, next) => {

    if (!req.user || !req.user.rol) {
      return res.status(403).json({
        message: "No autorizado"
      });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        message: "Acceso denegado"
      });
    }

    next();
  };
};

module.exports = verifyRole;