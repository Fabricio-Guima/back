const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  // const token = req.header("token");
  // const tokenDividido = req.headers.authorization.split(" ");
  // const token = tokenDividido[1];
  const token = req.headers.authorization;

  console.log("token: ", token);
  if (!token) {
    return res.status(401).json({
      msg: "Não existe token na requisição"
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    console.log("uid: ", uid);

    //pegar usuário pelo token (uid)
    const usuario = await Usuario.findById(uid);

    console.log("usuario: ", usuario);
    //Saber realmente se o usuário existe
    if (!usuario) {
      return res.status(401).json({
        msg: "Não há registro do usuário"
      });
    }

    console.log("user: ", usuario);

    req.usuario = usuario;

    next();
  } catch (err) {
    return res.status(401).json({
      msg: "Token inválido"
    });
  }
  console.log(token);
};

module.exports = {
  validarJWT
};
