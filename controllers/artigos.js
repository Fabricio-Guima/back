const { response, request } = require("express");
const Article = require("../models/artigo");
const { v4: uuidv4 } = require("uuid");
const { REPL_MODE_SLOPPY } = require("repl");

//pegar todos os artigos  e paginar,pegar total, mostrar categorias e quem é o user (dono)
const pegarProdutos = async (req, res = response) => {
  const { _limit = 5, _page = 1, valor = "" } = req.query;
  const skip = Number((_page - 1) * _limit) || 0;
  console.log("Limit: ", _limit);
  console.log("query do vue: ", req.query);

  // console.log("Limit: ", _limit);

  const [total, artigos] = await Promise.all([
    Article.find({
      $or: [
        { name: new RegExp(valor, "i") },
        { descricao: new RegExp(valor, "i") }
      ]
    }).countDocuments(),

    //.populate("usuario", ["name", "email"]) para pegar mais cammpos e mostrar
    Article.find({
      $or: [
        { name: new RegExp(valor, "i") },
        { description: new RegExp(valor, "i") }
      ]
    })
      .populate("author", "name")
      .populate("category", "name")
      .skip(Number(skip))
      .limit(Number(_limit))
  ]);

  console.log("total prod back: ", total);

  res.json({
    total,
    artigos
  });
};

//pegar artigo por id
const pegarProduto = async (req, res = response) => {
  const { id } = req.params;
  const artigo = await Article.findById(id)
    .populate("author", "name")
    .populate("category", "name");

  res.json(artigo);
};

//pegar produtos de um usuario
const pegarProdutosUsuario = async (req, res = response) => {
  const usuario = req.usuario;
  console.log("produtos do usuario back: ", req.usuario);
  try {
    const artigos = await Article.find({
      usuario: usuario._id
    });
    const totalArtigos = await Article.find({
      usuario: usuario._id
    }).countDocuments();

    res.status(200).json({
      totalArtigos,
      artigos
    });
  } catch (err) {
    res.status(500).json({
      msg: "Erro ao localizar artigos do usuário"
    });
  }
};

//pegar um produto de um usuario
const pegarProdutoUsuario = async (req, res = response) => {
  const usuario = req.usuario;
  console.log("produtos do usuario back: ", req.usuario);
  try {
    const artigos = await Article.find({
      usuario: usuario._id
    });
    const totalArtigos = await Article.find({
      usuario: usuario._id
    }).countDocuments();

    res.status(200).json({
      totalArtigos,
      artigos
    });
  } catch (err) {
    res.status(500).json({
      msg: "Erro ao localizar artigos do usuário"
    });
  }
};

//criar artigo
const criarProduto = async (req, res = response) => {
  const { author, title, ...body } = req.body;

  try {
    const existsArtigo = await Article.findOne({ title: title });

    if (existsArtigo) {
      res.status(400).json({
        msg: "Artigo já existe no banco de dados"
      });
    }

    const data = {
      title: title.toUpperCase(),
      ...body,
      author: author
    };
    const artigo = new Article(data);
    await artigo.save();

    res.status(201).json({
      artigo
    });
  } catch (err) {
    res.status(400).json({
      msg: err
    });
  }
};

//atualizar produto
const atualizarProduto = async (req, res = response) => {
  const { id } = req.params;
  console.log("Produto atualizar: ", req.body);

  const { author, ...data } = req.body;

  if (data.title) {
    data.title = data.title.toUpperCase();
  }

  data.author = req.body.author;

  try {
    const artigo = await Article.findByIdAndUpdate(id, data, { new: true });

    res.json(artigo);
  } catch (err) {
    res.status(400).json([{ msg: "Não foi possível atualizar o artigo" }]);
  }
};

//deletar um artigo
const deletarProduto = async (req, res = response) => {
  const { id } = req.params;
  const artigoDeletado = await Article.findByIdAndDelete(id);
  res.json(artigoDeletado);
};

module.exports = {
  pegarProdutos,
  pegarProdutosUsuario,
  criarProduto,
  pegarProduto,
  atualizarProduto,
  deletarProduto,
  pegarProdutoUsuario
};
