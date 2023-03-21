const db = require("../config/db.js");

module.exports = {
  //CREAR  
  createTipoDocumento: (req, res) => {
    const IdUsuario = req.body.IdUsuario;
    const TipoDocumento = req.body.TipoDocumento;

    if ((TipoDocumento == null ||/^[\s]*$/.test(TipoDocumento)) && TipoDocumento.length() <= 255) {
      return res.status(409).send({
        error: "Ingrese Tipo Documento válido.",
      });
    } 
    if ((IdUsuario == null || /^[\s]*$/.test(IdUsuario)) && IdUsuario.length() <= 36) {
        return res.status(409).send({
          error: "Ingrese Id usuario válido.",
        });
      } 
    else {
      db.query(
        `CALL sp_AgregarTipoDocumento('${IdUsuario}', '${TipoDocumento}' )`,
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
  getTiposDocumento: (req, res) => {
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

  // DETALLE POR ID
  getDetailTipoDocumento: (req, res) => {
    const IdTipoDocumento = req.body.IdTipoDocumento;
    if (IdTipoDocumento == null ||/^[\s]*$/.test(IdTipoDocumento)) {
        return res.status(409).send({
          error: "Ingrese IdTipoDocumento.",
        });
      } 

    db.query(
      `CALL sp_DetalleTipoDocumento('${IdTipoDocumento}')`,
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

  //MODIFICA POR ID
  modifyTipoDocumento: (req, res) => {
    const IdTipoDocumento = req.body.IdTipoDocumento;
    const TipoDocumento = req.body.TipoDocumento;
    const IdUsuarioModificador = req.body.ModificadoPor;

    if (IdTipoDocumento == null ||/^[\s]*$/.test(IdTipoDocumento)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }

    if (TipoDocumento == null ||/^[\s]*$/.test(TipoDocumento)) {
      return res.status(409).send({
        error: "Ingrese Tipo Documento",
      });
    }
    
    if (IdUsuarioModificador == null ||/^[\s]*$/.test(IdUsuarioModificador)) {
        return res.status(409).send({
          error: "Ingrese Id usuario modificador",
        });
      } else {
      db.query(
        `CALL sp_ModificaTipoDocumento('${IdTipoDocumento}','${TipoDocumento}','${IdUsuarioModificador}')`,
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
  deleteTipoDocumento: (req, res) => {
    const IdTipoDocumento = req.body.IdTipoDocumento;
    const IdUsuarioModificador = req.body.ModificadoPor;
    db.query(
      `CALL sp_BajaLogicaTipoDocumento('${IdTipoDocumento}', '${IdUsuarioModificador}')`,
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
