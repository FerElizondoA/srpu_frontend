const db = require("../config/db.js");

module.exports = {
  getTrazabilidadSolicitud: (req, res) => {
    const IdUsuarioModificador = req.body.IdUsuario;
    db.query(`CALL sp_ListadoTrazabilidadSolicitud('${IdUsuarioModificador}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }

      if (result.length) {
        const data = result[0];
        return res.status(200).send({
          data,
        });
      } else {
        return res.status(409).send({
          error: "¡Sin Información!",
        });
      }
    });
  },
};
