const { Schema, model } = require("mongoose");

const CommentSchema = Schema({
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article",
    required: true
  },
  text: {
    type: String,
    maxlength: 255,
    required: [true, "Campo comentário é obrigatório"]
  }
});

CommentSchema.methods.toJSON = function () {
  const { __v, ...comment } = this.toObject();

  return comment;
};

module.exports = model("Comment", CommentSchema);
