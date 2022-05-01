const { response, request } = require("express");
const Comment = require("../models/comentario");
const router = require("../routes/auth");

//pegar todas comentários de um artigo
const pegarComentarios = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const { id } = req.params;
  console.log("id", id);

  try {
    const [total, comentarios] = await Promise.all([
      Comment.countDocuments(),
      Comment.find({ article: id }).skip(Number(desde)).limit(Number(limite))
    ]);

    res.json({
      total,
      comentarios
    });
  } catch (err) {
    res.status(500).json({
      msg: "Erro ao localizar comentários"
    });
  }
};

//criar categoria
const criarComentario = async (req, res = response) => {
  const text = req.body.text;

  const { id } = req.params;

  const data = {
    text,
    article: id
  };
  const comment = new Comment(data);
  await comment.save();

  res.status(201).json({
    comment
  });
};

module.exports = {
  pegarComentarios,
  criarComentario
};
