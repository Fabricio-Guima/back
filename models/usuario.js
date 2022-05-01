const { Schema, model } = require("mongoose");

const AuthorSchema = Schema({
  first_name: {
    type: String,
    required: [true, "Campo nome é obrigatório"],
    maxlength: 50
  },
  last_name: {
    type: String,
    required: [true, "Campo sobrenome é obrigatório"],
    maxlength: 50
  },
  age: {
    type: Number,
    required: [true, "Campo idade é obrigatório"],
    maxlength: 3
  },
  email: {
    type: String,
    required: [true, "Campo email é obrigatório"],
    unique: true,
    maxlength: 50
  },
  password: {
    type: String,
    required: [true, "Campo password é obrigatório"]
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  }
});

AuthorSchema.methods.toJSON = function () {
  const { __v, password, _id, ...author } = this.toObject();
  author.uid = _id;
  return author;
};

module.exports = model("Author", AuthorSchema);
