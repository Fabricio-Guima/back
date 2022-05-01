const { response } = require("express");

const validarArquivo = (req, res = response, next) => {
  console.log("backend arquivoooooooooooo:", req.files);
  if (!req.files || Object.keys(req.files).length === 0 || !req.files) {
    return res.status(400).json([
      {
        msg: "Campo foto obrigatório",
        success: false,
        img: true
      }
    ]);
  }
  next();
};

module.exports = {
  validarArquivo
};
