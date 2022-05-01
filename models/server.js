const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/v1/auth",
      categorias: "/api/v1/categories",
      artigos: "/api/v1/articles",
      usuarios: "/api/v1/usuarios",
      buscar: "/api/v1/buscar",
      comentarios: "/api/v1/comments"
    };

    // conectar no db
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rotas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.artigos, require("../routes/artigos"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.comentarios, require("../routes/comentario"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor rodando na porta", this.port);
    });
  }
}

module.exports = Server;
