const db = require("../config/db.js");

module.exports = {
  getTrazabilidadSolicitud: (req, res) => {
    const IdSolicitud = req.query.IdSolicitud;
    if (IdSolicitud == null || /^[\s]*$/.test(IdSolicitud)) {
      return res.status(409).send({
        error: "Ingrese IdSolicitud",
      });
    }
    db.query(`CALL sp_ListadoTrazabilidadSolicitud('${IdSolicitud}')`, (err, result) => {
      if (err) {
        console.log(err)
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
