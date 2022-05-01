const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Article = require("../models/artigo");

const emailExiste = async (email = "") => {
  // Verificar se o email existe
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`O email: ${email}, já se encontra registrado`);
  }
};

const existeAutorPorId = async (id) => {
  // Verificar se o email existe
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`Não existe ID ${id}`);
  }
};

///CATEGORIA///
const existeCategoria = async (id) => {
  // Verificar se  o email existe
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`Categoria não existe!!!!`);
  }
};

///Artigo///
const existeArtigo = async (id) => {
  // Verificar se o email existe
  const existeArtigo = await Article.findById(id);
  if (!existeArtigo) {
    throw new Error(`Artigo não existe.`);
  }
};

module.exports = {
  emailExiste,
  existeAutorPorId,
  existeCategoria,
  existeArtigo
};
