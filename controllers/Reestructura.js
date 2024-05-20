const db = require("../config/db.js");

module.exports = {

    createSolicitudReestructura: (req, res) => {
        const IdSolicitud = req.body.IdSolicitud;
        const Solicitud = req.body.Solicitud;
        const IdUsuarioSolicitante = req.body.IdUsuarioSolicitante;
    
        if (
          (IdUsuarioSolicitante == null || /^[\s]*$/.test(IdUsuarioSolicitante)) &&
          IdUsuarioSolicitante.length() <= 36
        ) {
          return res.status(409).send({
            error: "Ingrese Id usuario válido.",
          });
        } else {
          db.query(
            `CALL sp_AgregarSolicitudReestructura('${IdSolicitud}', '${Solicitud}', '${IdUsuarioSolicitante}')`,
            (err, result) => {
              console.log(err)
              console.log(result)
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
        }
      },

}