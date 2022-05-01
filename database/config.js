const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
      // useFindAndModify: false
    });

    console.log("Conectado ao DB");
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao conectar na base de dados");
  }
};

module.exports = {
  dbConnection
};
