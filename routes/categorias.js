const { Router } = require("express");
const { check } = require("express-validator");
const {
  pegarCategorias,
  pegarCategoria,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria
} = require("../controllers/Categorias");
const { existeCategoria } = require("../helpers/db-validators");

const { validarCampos, validarJWT, adminRole } = require("../middlewares");

const router = Router();

//todas as categorias
router.get("/", pegarCategorias);

//pegar uma categoria por id
router.get(
  "/:id",
  [
    check("id").custom(existeCategoria),
    check("id", "Não um id de formato válido").isMongoId(),
    validarCampos
  ],
  pegarCategoria
);

//criar uma categoria
router.post(
  "/",
  [
    validarJWT,
    check("name", "Campo name é obrigatório").not().isEmpty(),
    validarCampos
  ],
  criarCategoria
);

//atualizar uma categoria
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "Não um id de formato válido").isMongoId(),
    check("name", "Campo name é obrigatório").not().isEmpty(),
    check("id").custom(existeCategoria),
    validarCampos
  ],
  atualizarCategoria
);

//deletar uma categoria
router.delete(
  "/:id",
  [
    validarJWT,
    adminRole,
    check("id", "Não um id de formato válido").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos
  ],
  deletarCategoria
);

module.exports = router;
