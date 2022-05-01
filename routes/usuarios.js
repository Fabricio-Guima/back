const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT, hasRole } = require("../middlewares");

const { existeAutorPorId } = require("../helpers/db-validators");

const {
  authorsGet,
  authorsPut,
  authorsPost,
  authorsDelete
} = require("../controllers/usuarios");

const router = Router();

router.get("/", authorsGet);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "Não é um ID válido").isMongoId(),
    check("id").custom(existeAutorPorId),

    validarCampos
  ],
  authorsPut
);

router.post(
  "/",
  [
    check("first_name", "Campo nome é obrigatório").not().isEmpty(),
    check("last_name", "Campo sobrenome é obrigatório").not().isEmpty(),
    check("age", "Campo idade é obrigatório").not().isEmpty(),
    check("email", "Campo email é obrigatório").not().isEmpty(),
    check("password", "Campo password é obrigatório").not().isEmpty(),
    validarCampos
  ],

  authorsPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    // adminRole,
    hasRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "Não é um ID válido").isMongoId(),
    check("id").custom(existeAutorPorId),
    validarCampos
  ],
  authorsDelete
);

module.exports = router;
