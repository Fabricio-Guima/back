const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Author = require("../models/usuario");

const authorsGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  const [total, authors] = await Promise.all([
    Author.countDocuments(),
    Author.find()
      .populate("category", "name")
      .skip(Number(desde))
      .limit(Number(limite))
  ]);

  console.log("cade?", authors);

  res.json({
    total,
    authors
  });
};

const authorsPost = async (req, res = response) => {
  try {
    const { first_name, last_name, age, email, password } = req.body;
    console.log("user front: ", req.body);
    const usuario = new Author({
      first_name,
      last_name,
      age,
      email
    });

    // Hashear password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // salvar no DB
    await usuario.save();

    res.json({
      usuario
    });
  } catch (err) {
    console.log(err);
  }
};

const authorsPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, ...resto } = req.body;

  if (password) {
    // Hashear password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const autor = await Author.findByIdAndUpdate(id, resto, { new: true });

  res.json(autor);
};

const authorsDelete = async (req, res = response) => {
  const { id } = req.params;

  // excluir Fisicamente
  const autor = await Author.findByIdAndDelete(id);

  res.json({ autor });
};

module.exports = {
  authorsGet,
  authorsPost,
  authorsPut,
  authorsDelete
};
