const { Schema, model } = require("mongoose");

const ArticleSchema = Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  title: {
    type: String,
    unique: true,
    required: [true, "Campo título é obrigatório"]
  },
  description: {
    type: String,
    maxlength: 255
  },
  text: {
    type: String,
    maxlength: 255
  }
});

ArticleSchema.methods.toJSON = function () {
  const { __v, ...article } = this.toObject();

  return article;
};

module.exports = model("Article", ArticleSchema);
