const jwt = require("jsonwebtoken");

const gerarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "2d"
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("Não se pode gerar o token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  gerarJWT
};
