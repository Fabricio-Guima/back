const { response, request } = require("express");
const Category = require("../models/categoria");
const router = require("../routes/auth");

//pegar todas as categorias de um usuário e paginar e total de categorias por meio
const pegarCategorias = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  try {
    const [total, categorias] = await Promise.all([
      Category.countDocuments(),
      Category.find()
        .populate("author", "first_name")
        .populate("article")
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
      total,
      categorias
    });
  } catch (err) {
    res.status(500).json({
      msg: "Erro ao localizar categorias do usuário"
    });
  }
};

//pegar categoria por id
const pegarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoria = await await Category.findById(id).populate(
    "author",
    "name"
  );
  res.json(categoria);
};

//criar categoria
const criarCategoria = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const type = req.body.type;

  const existsCategoria = await Category.findOne({ name });
  if (existsCategoria) {
    res.status(400).json({
      msg: "Categoria já existe no banco de dados"
    });
  }

  const data = {
    name,
    type,
    author: req.usuario._id
  };
  const categoria = new Category(data);
  await categoria.save();

  res.status(201).json({
    categoria
  });
};

//atualizar categoria
const atualizarCategoria = async (req, res = response) => {
  const { id } = req.params;

  const { usuario, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.author = req.usuario._id;

  const categoria = await Category.findByIdAndUpdate(id, data, { new: true });

  res.json(categoria);
};

//deletar uma categoria logicamente status = false
const deletarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoriaDeletada = await Category.findByIdAndDelete(id);

  res.json(categoriaDeletada);
};

module.exports = {
  pegarCategorias,
  criarCategoria,
  pegarCategoria,
  atualizarCategoria,
  deletarCategoria
};
