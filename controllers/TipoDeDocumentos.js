const db = require("../config/db.js");

module.exports = {
//Crear
createTipoDeDocumento: (req, res) => {
    const IdUsuarioCreador = req.body.CreadoPor;
    const TipoDeDocumento = req.body.TipoDocumento;
    const ObligadoLargoPlazo = req.body.ObligadoLargoPlazo
    const ObligadoCortoPlazo = req.body.ObligadoCortoPlazo

    if ((IdUsuarioCreador == null || /^[\s]*$/.test(IdUsuarioCreador)) && IdUsuarioCreador.length() <= 36) {
        return res.status(409).send({
          error: "Ingresé Id usuario válido.",
        });
      }
      if ((TipoDeDocumento == null ||/^[\s]*$/.test(TipoDeDocumento)) && TipoDeDocumento.length() <= 255) {
        return res.status(409).send({
          error: "Ingresé un tipo de documento válida.",
        });
      }
      if ((ObligadoCortoPlazo == null ||/^[\s]*$/.test(ObligadoCortoPlazo)) && ObligadoLargoPlazo.length() <= 1) {
        return res.status(409).send({
          error: "Ingresé 0 si no es obligatorio y 1 si es obligatorio.",
        });
      }
      if ((ObligadoLargoPlazo == null ||/^[\s]*$/.test(ObligadoLargoPlazo)) && ObligadoLargoPlazo.length() <= 1) {
        return res.status(409).send({
          error: "Ingresé 0 si no es obligatorio y 1 si es obligatorio.",
        });
      }
      else {
        db.query(
          `CALL sp_AgregarTipoDocumento('${IdUsuarioCreador}', '${TipoDeDocumento}', '${ObligadoCortoPlazo}', '${ObligadoLargoPlazo}' )`,
          (err, result) => {
            console.log(result);
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
    console.log(req);
    db.query(`CALL sp_ListadoTiposDocumentosCortoPlazo()`, (err, result) => {
      console.log(err);
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


//BORRADO LOGICO
deleteTipoDeDocumento: (req, res) => {
    const IdDocumento = req.body.IdDocumento;
    const IdUsuarioModificador = req.body.ModificadoPor;
    db.query(
      `CALL sp_BajaLogicaTipoDocumento('${IdDocumento}', '${IdUsuarioModificador}')`,
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