const db = require("../config/db.js");

module.exports = {

  // DETALLE POR ID
  getDetailUsuario: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    db.query(
      `CALL sp_DetalleUsuario('${IdUsuario}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }
        if (result.length) {
          const data = result[0][0];
          return res.status(200).send({
            data,
          });
        } else {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
      }
    );
  },

};
