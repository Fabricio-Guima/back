const { Router } = require("express");
const { check } = require("express-validator");
const {
  pegarProdutos,
  pegarProdutosUsuario,
  pegarProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto
} = require("../controllers/artigos");
const { existeCategoria, existeArtigo } = require("../helpers/db-validators");

const { validarCampos, validarJWT, adminRole } = require("../middlewares");

const router = Router();

//todos os produtos
router.get("/", pegarProdutos);

//Todos os produtos de um usuário
router.get("/user", [validarJWT, validarCampos], pegarProdutosUsuario);

//pegar um produto por id
router.get(
  "/:id",
  [
    check("id").custom(existeArtigo),
    check("id", "Não é um id de formato válido").isMongoId(),
    validarCampos
  ],
  pegarProduto
);

//criar um artigo
router.post(
  "/",
  [
    validarJWT,
    check("title", "Campo título é obrigatório").not().isEmpty(),
    check("author", "Campo autor é obrigatório").not().isEmpty(),
    check("author", "Não é um id de formato válido").isMongoId(),
    check("category", "Campo categoria é obrigatório").not().isEmpty(),
    check("category", "Não é um id de formato válido").isMongoId(),
    check("category").custom(existeCategoria),

    validarCampos
  ],
  criarProduto
);

//atualizar um artigo
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "Não é um id de formato válido").isMongoId(),
    check("title", "Campo título é obrigatório").not().isEmpty(),
    check("id").custom(existeArtigo),
    validarCampos
  ],
  atualizarProduto
);

//deletar um artigo
router.delete(
  "/:id",
  [
    validarJWT,
    adminRole,
    check("id", "Não um id de formato válido").isMongoId(),
    check("id").custom(existeArtigo),
    validarCampos
  ],
  deletarProduto
);

module.exports = router;
