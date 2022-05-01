const { Router } = require("express");
const { check } = require("express-validator");
const {
  pegarComentarios,
  criarComentario
} = require("../controllers/comentario");

const { validarCampos } = require("../middlewares");

const router = Router();

//pegar os comentarios de um artigo
router.get(
  "/:id",
  [check("id", "Não um id de formato válido").isMongoId(), validarCampos],
  pegarComentarios
);

//criar um comentario para um artigo
router.post(
  "/:id",
  [check("text", "Campo texto é obrigatório").not().isEmpty(), validarCampos],
  criarComentario
);

module.exports = router;
