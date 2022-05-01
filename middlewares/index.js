const validarCampos = require("./validar-campos");
const validarJWT = require("./validar-jwt");
const validarRoles = require("./validar-roles");
const validarArquivo = require("./validar-arquivo");

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...validarRoles,
  ...validarArquivo
};
