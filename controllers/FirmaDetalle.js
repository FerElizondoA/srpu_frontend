const db = require("../config/db.js");

module.exports = {
  createFirmaDetalle: (req, res) => {
    const IdPathDoc = req.body.IdPathDoc;
    const IdFirma = req.body.IdFirma;
    const IdSolicitud = req.body.IdSolicitud;
    const NumeroOficio = req.body.NumeroOficio;
    const TipoFirma = req.body.TipoFirma;
    const Asunto = req.body.Asunto;
    const Rfc = req.body.Rfc;
    const SerialCertificado = req.body.SerialCertificado;
    const FechaFirma = req.body.FechaFirma;
    const FechaDoc = req.body.FechaDoc;
    const PathDoc = req.body.PathDoc;
    const CreadoPor = req.body.CreadoPor;

    db.query(
      `CALL sp_AgregarFirmaDetalle('${IdPathDoc}', '${IdFirma}',  '${IdSolicitud}', '${NumeroOficio}', '${TipoFirma}','${Asunto}', '${Rfc}', '${SerialCertificado}', '${FechaFirma}', '${FechaDoc}', '${PathDoc}', '${CreadoPor}' )`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }
        if (result.length) {
          const data = result[0][0];
          if (data.error) {
            return res.status(409).send({
              result: data,
            });
          }
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

  getFirmaDetalle: (req, res) => {
    const IdSolicitud = req.query.IdSolicitud;
    db.query(`CALL sp_ListadoFirmaDetalle('${IdSolicitud}')`, (err, result) => {
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
