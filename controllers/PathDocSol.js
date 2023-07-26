const db = require("../config/db.js");

module.exports = {
  //CREAR
  addPathDocSol: (req, res) => {
    const IdSolicitud = req.body.IdSolicitud;
    const Ruta = req.body.Ruta;
    const NombreIdentificador = req.body.NombreIdentificador;
    const NombreArchivo = req.body.NombreArchivo;

    db.query(
      `CALL sp_AddPathDocSol('${IdSolicitud}', '${Ruta}', '${NombreIdentificador}' , '${NombreArchivo}' )`,
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
  // DETALLE POR ID
  getDetailPathDocSol: (req, res) => {
    const IdSolicitud = req.query.IdSolicitud;
    if (IdSolicitud == null || /^[\s]*$/.test(IdSolicitud)) {
      return res.status(409).send({
        error: "Ingrese IdSol.",
      });
    }
    db.query(`CALL sp_DetallePathDocSol('${IdSolicitud}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        const data = result[0];
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
    });
  },

  //CREAR
  addPathDocAut: (req, res) => {
    const IdAutorizacion = req.body.IdAutorizacion;
    const Ruta = req.body.Ruta;
    const NombreIdentificador = req.body.NombreIdentificador;
    const NombreArchivo = req.body.NombreArchivo;

    db.query(
      `CALL sp_AddPathDocAutorizaciones('${IdAutorizacion}', '${Ruta}', '${NombreIdentificador}' , '${NombreArchivo}' )`,
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
  // DETALLE POR ID
  getDetailPathDocAut: (req, res) => {
    const IdAutorizacion = req.query.IdAutorizacion;
    if (IdAutorizacion == null || /^[\s]*$/.test(IdAutorizacion)) {
      return res.status(409).send({
        error: "Ingrese IdSol.",
      });
    }
    db.query(
      `CALL sp_DetallePathDocAutorizaciones('${IdAutorizacion}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }
        if (result.length) {
          const data = result[0];
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
