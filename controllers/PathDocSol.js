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
    const IdSolicitud = req.body.IdSolicitud;
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
    });
  },

  // //MODIFICA POR ID
  // modifyRol: (req, res) => {
  //   const IdRol = req.body.IdRol;
  //   const Rol = req.body.NuevoRol;
  //   const IdUsuarioModificador = req.body.IdUsuario;

  //   if (IdRol == null ||/^[\s]*$/.test(IdRol)) {
  //     return res.status(409).send({
  //       error: "Ingrese Id",
  //     });
  //   }

  //   if (Rol == null ||/^[\s]*$/.test(Rol)) {
  //     return res.status(409).send({
  //       error: "Ingrese Nuevo Rol",
  //     });
  //   }

  //   if (IdUsuarioModificador == null ||/^[\s]*$/.test(IdUsuarioModificador)) {
  //       return res.status(409).send({
  //         error: "Ingrese Id usuario modificador",
  //       });
  //     } else {
  //     db.query(
  //       `CALL sp_ModificaRol('${IdRol}','${Rol}','${IdUsuarioModificador}')`,
  //       (err, result) => {
  //         if (err) {
  //           return res.status(500).send({
  //             error: "Error",
  //           });
  //         }
  //         if (result.length) {
  //           const data = result[0][0];
  //           if (data.error) {
  //             return res.status(409).send({
  //               result: data,
  //             });
  //           }
  //           return res.status(200).send({
  //             result: data,
  //           });
  //         } else {
  //           return res.status(409).send({
  //             error: "¡Sin Información!",
  //           });
  //         }
  //       }
  //     );
  //   }
  // },

  // //BORRADO LOGICO
  // deleteRol: (req, res) => {
  //   const IdRol = req.body.IdRol;
  //   const IdUsuarioModificador = req.body.IdUsuario;
  //   db.query(
  //     `CALL sp_BajaLogicaRol('${IdRol}', '${IdUsuarioModificador}')`,
  //     (err, result) => {
  //       if (err) {
  //         return res.status(500).send({
  //           error: "Error",
  //         });
  //       }
  //       if (result.length) {
  //         const data = result[0][0];
  //         if (data.error) {
  //           return res.status(409).send({
  //             result: data,
  //           });
  //         }
  //         return res.status(200).send({
  //           result: data,
  //         });
  //       } else {
  //         return res.status(409).send({
  //           error: "¡Sin Información!",
  //         });
  //       }
  //     }
  //   );
  // },
};
