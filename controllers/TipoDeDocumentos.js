const db = require("../config/db.js");

module.exports = {
  //Crear
  createTipoDeDocumento: (req, res) => {
    const IdUsuarioCreador = req.body.IdUsuario;
    const TipoDeDocumento = req.body.Descripcion;
    const OCP = req.body.OCP;
    const OLP = req.body.OLP;

    if (IdUsuarioCreador == null || /^[\s]*$/.test(IdUsuarioCreador)) {
      return res.status(409).send({
        error: "Ingresé Id usuario válido.",
      });
    }
    if (TipoDeDocumento == null || /^[\s]*$/.test(TipoDeDocumento)) {
      return res.status(409).send({
        error: "Ingresé un tipo de documento válida.",
      });
    }
    if (OCP == null || /^[\s]*$/.test(OCP)) {
      return res.status(409).send({
        error: "Ingresé 0 si no es obligatorio y 1 si es obligatorio.",
      });
    }
    if (OLP == null || /^[\s]*$/.test(OLP)) {
      return res.status(409).send({
        error: "Ingresé 0 si no es obligatorio y 1 si es obligatorio.",
      });
    } else {
      db.query(
        `CALL sp_AgregarTipoDocumento('${IdUsuarioCreador}', '${TipoDeDocumento}', '${OCP}', '${OLP}' )`,
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
    }
  },

  //LISTADO COMPLETO
  getListadoTipoDeDocumento: (req, res) => {
    db.query(`CALL sp_ListadoTiposDocumento()`, (err, result) => {
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

  getListadoTipoDeDocumentoLargoPlazo: (req, res) => {
    db.query(`CALL sp_ListadoTiposDocumentoLargoPlazo()`, (err, result) => {
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

  getListadoTipoDeDocumentoCortoPlazo: (req, res) => {
    db.query(`CALL sp_ListadoTiposDocumentosCortoPlazo()`, (err, result) => {
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

  //MODIFICA POR ID
  modifyTipoDocumento: (req, res) => {
    const IdDescripcion = req.body.IdDescripcion;
    const Descripcion = req.body.Descripcion;
    const IdUsuarioModificador = req.body.IdUsuario;
    const OCP = req.body.OCP;
    const OLP = req.body.OLP;

    if (IdDescripcion == null || /^[\s]*$/.test(IdDescripcion)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }

    if (Descripcion == null || /^[\s]*$/.test(Descripcion)) {
      return res.status(409).send({
        error: "Ingrese Tipo Documento",
      });
    }

    if (IdUsuarioModificador == null || /^[\s]*$/.test(IdUsuarioModificador)) {
      return res.status(409).send({
        error: "Ingrese Id usuario modificador",
      });
    } else {
      db.query(
        `CALL sp_ModificaTipoDocumento('${IdDescripcion}','${Descripcion}','${IdUsuarioModificador}','${OCP}','${OLP}')`,
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
              result: data,
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

  //BORRADO LOGICO
  deleteTipoDeDocumento: (req, res) => {
    const IdDescripcion = req.query.IdDescripcion;
    const IdUsuarioModificador = req.query.IdUsuario;
    db.query(
      `CALL sp_BajaLogicaTipoDocumento('${IdDescripcion}', '${IdUsuarioModificador}')`,
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
            result: data,
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
