const dbValidators = require("./db-validators");
const gerarJWT = require("./gerarJWT");
const subirArquivo = require("./subir-arquivo");

module.exports = { ...dbValidators, ...gerarJWT, ...subirArquivo };
