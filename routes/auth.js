const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/login",
  [
    // check("email", "Campo e-mail é obrigatório").isEmail(),
    // check("password", "Campo password é obrigatório").not().isEmpty(),
    // validarCampos
  ],
  login
);

module.exports = router;
