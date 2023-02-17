const jwt = require("jsonwebtoken");

module.exports = {
  verifyJWT: (req, res, next) => {
    let tokenHeaderKey = process.env.SRPU_B_APP_TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.SRPU_B_APP_JWT_SECRET_KEY;
    const token = req.header(tokenHeaderKey);
    if (!token) {
      res.send("Necesitas un token.");
    } else {
      jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
          res
            .status(401)
            .json({ auth: false, message: "Error de autenticación." });
        } else {
          next();
          
        }
      });
    }
  },
};
