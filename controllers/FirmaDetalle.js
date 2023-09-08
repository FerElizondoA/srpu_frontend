const db = require("../config/db.js");

module.exports = {
  createFirmaDetalle: (req, res) => {
    const IdPathDoc = req.body.IdPathDoc;
    const IdFirma = req.body.IdFirma;
    const IdSolicitud = req.body.IdSolicitud;
    const NumeroOficio = req.body.NumeroOficio;
    const Asunto = req.body.Asunto;
    const Rfc = req.body.Rfc;
    const SerialCertificado = req.body.SerialCertificado;
    const FechaFirma = req.body.FechaFirma;
    const FechaDoc = req.body.FechaDoc;
    const PathDoc = req.body.PathDoc;
    const CreadoPor = req.body.CreadoPor;

    db.query(
      `CALL sp_AgregarFirmaDetalle('${IdPathDoc}', '${IdFirma}',  '${IdSolicitud}', '${NumeroOficio}', '${Asunto}', '${Rfc}', '${SerialCertificado}', '${FechaFirma}', '${FechaDoc}', '${PathDoc}', '${CreadoPor}' )`,
      (err, result) => {
        console.log(err);
        console.log(result);
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }
        if (result.length) {
          console.log(result);
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
};
