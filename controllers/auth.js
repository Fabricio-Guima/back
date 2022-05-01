const { response } = require("express");
const Author = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { gerarJWT } = require("../helpers/gerarJWT");

const login = async (req, res = response) => {
  console.log("login do vue kkk: ", req.body);
  console.log("TOKEN header: ", req.headers.authorization);

  const { email, password } = req.body;

  try {
    //verificar se email existe
    const author = await Author.findOne({ email: email });
    if (!author) {
      return res.status(400).json({
        msg: "Usuário ou senha não corretos "
      });
    }

    //verificar a senha
    const validPassword = bcryptjs.compareSync(password, author.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuário ou senha não corretos"
      });
    }

    console.log("logado: ", author);

    //gerar token
    const token = await gerarJWT(author._id);

    res.json({
      author,
      token
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Ocorreu um erro. Tente mais tarde"
    });
  }
};

module.exports = {
  login
};
