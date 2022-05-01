const { response } = require("express");
const Usuario = require("../models/usuario");

const adminRole = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Usuário inválido"
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Usuário inválido"
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: "Permissão negada ao usuário"
      });
    }
    next();
  };
};

module.exports = {
  adminRole,
  hasRole
};
