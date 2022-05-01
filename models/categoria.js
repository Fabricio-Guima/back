const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Campo nome é obrigatório"]
  },
  type: {
    type: String,
    default: true,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true
  }
});

CategorySchema.methods.toJSON = function () {
  const { __v, ...category } = this.toObject();

  return category;
};

module.exports = model("Category", CategorySchema);
